import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();
    const params = useParams();

    const {
        data: user,
        error,
        mutate
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;

                router.push('/verify-email');
            })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const register = async ({ setErrors, ...props }) => {
        await csrf();

        console.log('CSRF Token:', getCookie('XSRF-TOKEN'));

        setErrors([]);

        axios
            .post('/register', props, {
                headers: {
                    accept: 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                withCredentials: true
            })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        console.log('CSRF Token:', getCookie('XSRF-TOKEN'));

        setErrors([]);
        setStatus(null);

        axios
            .post('/login', props, {
                headers: {
                    accept: 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                withCredentials: true
            })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios.post('/email/verification-notification').then(response => setStatus(response.data.status));
    };

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }

        window.location.pathname = '/login';
    }, [error, mutate]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }
        if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) {
            logout();
        }
    }, [middleware, redirectIfAuthenticated, user, error, router, logout]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout
    };
};

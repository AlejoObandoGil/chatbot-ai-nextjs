'use client';

import React, { } from 'react';
import { useAuth } from '@/hooks/auth';
import Navigation from '@/app/(app)/Navigation.jsx';
import Loading from '@/app/(app)/Loading.jsx';

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' });

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="min-h-screen">
                <Navigation user={user} />

                {/* Contenido principal */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;

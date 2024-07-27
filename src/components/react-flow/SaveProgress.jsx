// useSaveProgress.js
import { useState } from 'react';
import axios from '@/lib/axios';
import { formatErrorMessage } from '@/utils/alertUtils.js';

const useSaveProgress = (chatbotId, nodes, edges, onSuccess) => {
    const [loadingSave, setLoadingSave] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');

    const saveProgress = async (e) => {
        e.preventDefault();
        setLoadingSave(true);

        try {
            const response = await axios.post(`/api/v1/chatbot/${chatbotId}/edge`, { nodes, edges });
            if (response.status === 200 || response.status === 201) {
                setAlertMessage(response.data.message);
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    if (onSuccess) onSuccess();
                }, 3000);
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
            handleErrorResponse(error.response);
        } finally {
            setLoadingSave(false);
        }
    };

    const handleErrorResponse = (response) => {
        const alertMessage = formatErrorMessage(response);
        setAlertMessage(alertMessage);
        setAlertColor('red');
        setShowAlert(true);
    };

    return {
        saveProgress,
        loadingSave,
        alertMessage,
        showAlert,
        alertColor,
    };
};

export default useSaveProgress;

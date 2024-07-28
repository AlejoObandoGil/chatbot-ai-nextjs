import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import axios from '@/lib/axios';
import { Card, Typography, Button, Switch, Alert } from '@material-tailwind/react';
import ChatbotPreview from '@/components/react-chatbot-kit/ChatbotPreview';
import { formatErrorMessage } from '@/utils/alertUtils';

export default function Preview({ chatbot }) {
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [loadingSave, setloadingSave] = useState(false);
    const [chatbotEnabled, setChatbotEnabled] = useState(chatbot.enabled);

    const handleSubmit = async () => {
        setloadingSave(true);

        try {
            let response;
            if (chatbot) {
                setChatbotEnabled(chatbotEnabled);
                response = await axios.put(`/api/v1/chatbot/${chatbot.id}/enable`);
            }

            if (response.status === 200 || response.status === 201) {
                setChatbotEnabled(response.data.chatbot.enabled);
                setAlertMessage(response.data.chatbot.enabled ? 'Tu chatbot está habilitado' : 'Tu chatbot está deshabilitado');
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
            handleErrorResponse(error.response);
        } finally {
            setloadingSave(false);
        }
    };

    const handleErrorResponse = (response) => {
        const alertMessage = formatErrorMessage(response);
        setAlertMessage(alertMessage);
        setAlertColor('red');
        setShowAlert(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scriptContent);
        alert('Script copiado al portapapeles');
    };

    const scriptContent = `
        <script src="/chatbot.bundle.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                window.renderChatbot('chatbot-root', '${chatbot.id}');
            });
        </script>`;

    return (
        <div className="flex items-center justify-center bg-gray-100 mt-2">
            <div className="w-full max-w-4xl">
                <Typography variant="h5" color="indigo" className="text-center mb-4">
                    Vista Previa del Chatbot
                </Typography>
                <div className="mt-4 mb-4">
                    {showAlert && (
                        <div>
                            <Alert color={alertColor}>
                                {alertMessage}
                            </Alert>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-start mb-4">
                    <Typography variant="h6" color="gray" className="text-center mx-4">
                        Habilitar o desabilitar chatbot para mostrarlo u ocultarlo en tu sitio web
                    </Typography>
                    <Switch
                        id="custom-switch-component"
                        ripple={false}
                        className="h-full w-full checked:bg-[#4E5EB8]"
                        checked={chatbotEnabled}
                        onChange={handleSubmit}
                        disabled={loadingSave}
                    />
                </div>

                <Card className="h-full w-full bg-indigo-50 shadow-md rounded-lg p-6">
                    <Typography variant="h6" color="gray-800" className="mb-2">
                        Script del Chatbot
                    </Typography>
                    <p className="text-gray-600 mb-4">ID del Chatbot: {chatbot.id}</p>
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                        <Typography variant="subtitle1" color="gray-700">
                            Coloca el siguiente código justo antes de la etiqueta de cierre <code>&lt;body&gt;</code> en el sitio web donde deseas que el chatbot se active:
                        </Typography>
                        <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-x-auto">
                            <code>
                                {scriptContent}
                            </code>
                        </pre>
                    </div>
                    <div className="flex justify-end">
                        <Button color="indigo" variant="gradient" onClick={copyToClipboard} size='sm' className="w-48">
                            <FiCopy />
                            Copiar Script
                        </Button>
                    </div>
                </Card>

                <div className="mt-6">
                    <ChatbotPreview chatbotId={chatbot.id} />
                </div>
            </div>
        </div>
    );
}

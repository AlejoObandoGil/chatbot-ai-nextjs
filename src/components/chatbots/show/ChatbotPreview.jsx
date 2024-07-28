import React from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import ChatbotBubble from '@/components/react-chatbot-kit/ChatbotBubble';

export default function ChatbotShow({ chatbotId }) {
    const scriptContent = `
        <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
        <script src="/chatbot.bundle.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const chatbotId = '${chatbotId}';
                window.renderChatbot('chatbot-root', chatbotId);
            });
        </script>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scriptContent);
        alert('Script copiado al portapapeles');
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 mt-2">
            <div className="w-full max-w-4xl">
                <Typography variant="h5" color="indigo" className="text-center mb-4">
                    Vista Previa del Chatbot
                </Typography>
                <Card className="h-full w-full bg-indigo-50 shadow-md rounded-lg p-6">
                    <Typography variant="h6" color="gray-800" className="mb-2">
                        Script del Chatbot
                    </Typography>
                    <p className="text-gray-600 mb-4">ID del Chatbot: {chatbotId}</p>
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                        <Typography variant="subtitle1" color="gray-700">
                            Coloca el siguiente código justo antes de la etiqueta de cierre <code>&lt;body&gt;</code> en la página donde deseas que el chatbot se active:
                        </Typography>
                        <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-x-auto">
                            <code>
                                {scriptContent}
                            </code>
                        </pre>
                    </div>
                    <Button color="indigo" onClick={copyToClipboard}>
                        Copiar Script
                    </Button>
                </Card>

                <div className="mt-6">
                    <ChatbotBubble chatbotId={chatbotId} />
                </div>
            </div>
        </div>
    );
}

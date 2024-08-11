import React, { useState } from 'react';
import { Card, CardBody, Button, Typography } from '@material-tailwind/react';
import ChatbotPreview from '@/components/react-chatbot-kit/ChatbotPreview';
import axios from '@/lib/axios';

const ConfigPersonalization = ({ chatbot }) => {
    const [MessageColor, setMessageColor] = useState('#7986CB');
    const [chatColor, setChatColor] = useState('#5C6BC0');

    const handleMessageColorChange = (e) => {
        setMessageColor(e.target.value);
        // onChangePersonilization({ botMessageBox: e.target.value, chatButton: chatColor });
    };

    const handleChatColorChange = (e) => {
        setChatColor(e.target.value);
        // onChangePersonilization({ botMessageBox: MessageColor, chatButton: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.post(`/api/v1/chatbot/${chatbot.id}/config`, {
                MessageColor: MessageColor,
                chatColor: chatColor
            });
            alert('Configuración guardada con éxito');
        } catch (error) {
            console.error('Error al guardar la configuración:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <Typography variant="h5" className="text-indigo-500 text-center text-lg font-semibold mb-3">Personalización del Chatbot</Typography>
            <Card>
                <CardBody>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Color de mensajes:
                        </label>
                        <div className="flex items-center">
                            <div className="relative">
                                <input
                                    type="color"
                                    value={MessageColor}
                                    onChange={handleMessageColorChange}
                                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                />
                                <div
                                    className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                                    style={{ backgroundColor: MessageColor }}
                                />
                            </div>
                            <span className="ml-4 text-sm">{MessageColor}</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Color del chatbot:
                        </label>
                        <div className="flex items-center">
                            <div className="relative">
                                <input
                                    type="color"
                                    value={chatColor}
                                    onChange={handleChatColorChange}
                                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                />
                                <div
                                    className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                                    style={{ backgroundColor: chatColor }}
                                />
                            </div>
                            <span className="ml-4 text-sm">{chatColor}</span>
                        </div>
                    </div>
                    <Button
                        onClick={handleSave}
                        color="indigo"
                        variant="gradient"
                        fullWidth
                    >
                        Guardar
                    </Button>
                </CardBody>
            </Card>
            <div className="mt-8">
                <ChatbotPreview chatbotId={chatbot.id} onChangePersonalization={[MessageColor, chatColor]} />
            </div>
        </div>
    );
};

export default ConfigPersonalization;

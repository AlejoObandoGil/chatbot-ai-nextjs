import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import axios from '@/lib/axios';
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const ChatbotPreview = ({ chatbotId }) => {
    const [showBot, toggleBot] = useState(false);
    const [botName, setBotName] = useState(null);
    const [initialMessages, setInitialMessages] = useState([]);
    const [initialOptions, setInitialOptions] = useState([]);

    useEffect(() => {
        const fetchBotConfig = async () => {
            try {
                const { data } = await axios.get(`/api/chatbot/${chatbotId}/talk/create`);
                setBotName(data.chatbot?.name || 'Chatbot');

                if (data.chatbot?.intents.length > 0 && data.chatbot.intents[0]?.responses.length > 0) {
                    setInitialMessages([data.chatbot.intents[0].responses[0].response]);
                    if (data.chatbot?.intents.length > 0 && data.chatbot.intents[0]?.options.length > 0) {
                        setInitialOptions(data.chatbot.intents[0].options);
                    }
                } else {
                    setInitialMessages(['Hola, en qué puedo ayudarte hoy?']);
                    setInitialOptions([]);
                }
            } catch (error) {
                console.error('Error fetching chatbot config:', error);
            }
        };

        fetchBotConfig();
    }, [chatbotId]);

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        return messages;
    };

    // const saveMessages = (messages) => {
    //     localStorage.setItem('chat_messages', JSON.stringify(messages));
    // };

    const clearMessages = async () => {
        const closed = await handleCloseTalk();
        if (closed) {
            toggleBot(false);
            setTimeout(() => {
                localStorage.clear();
            }, 500);
        }
    }

    const handleCloseTalk = async () => {
        try {
            const talkId = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('talk_id')) : null;
            if (talkId !== null) {
                const { data } = await axios.put(`/api/v1/chatbot/${chatbotId}/talk/${talkId}/close`);
                return data.closed;
            } else {
                return true;
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
    };

    return (
        <>
            <div className="fixed bottom-3 right-8 z-50">
                {showBot && (
                    <div className="fixed bottom-20 right-8 bg-white shadow-lg rounded-lg overflow-hidden">
                        <Chatbot
                            config={config(chatbotId, botName, initialMessages, initialOptions, clearMessages)}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            headerText="Chatbot"
                            placeholderText="Escribe tu consulta..."
                            messageHistory={loadMessages()}
                            // saveMessages={saveMessages}
                        />
                    </div>
                )}
                <button
                    className="bg-indigo-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                    onClick={() => toggleBot(prev => !prev)}
                >
                    <IoChatbubbleEllipsesSharp size={40} />
                </button>
            </div>
        </>
    );
};

export default ChatbotPreview;

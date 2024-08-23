import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import axios from '@/lib/axios';
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';
import { FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const ChatbotTutorial = ({ chatbotId, onChangePersonalization }) => {
    const [showBot, toggleBot] = useState(false);
    const [botName, setBotName] = useState(null);
    const [chatbot, setChatbot] = useState(null);
    const [initialMessages, setInitialMessages] = useState([]);
    const [initialOptions, setInitialOptions] = useState([]);
    const [personalization, setPersonalization] = useState([null, null]);
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const fetchBotConfig = async () => {
            try {
                const { data } = await axios.get(`/api/chatbot/${chatbotId}/talk/create`);
                setChatbot(data.chatbot);
                setBotName(data.chatbot?.name || 'Chatbot');

                if (data.chatbot?.config) {
                    setPersonalization([data.chatbot.config.message_color, data.chatbot.config.chat_color]);
                }

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

    useEffect(() => {
        if (onChangePersonalization) {
            setPersonalization(onChangePersonalization);
        }
    }, [onChangePersonalization]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        return messages;
    };

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
                const { data } = await axios.put(`/api/chatbot/${chatbotId}/talk/${talkId}/close`);
                return data.closed;
            } else {
                return true;
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
    };

    const variants = {
        initial: {
            opacity: 0,
            scale: 0.8,
            y: 60,
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 60,
        }
    };

    return (
        <>
            <div className="fixed bottom-3 left-14 z-50">
                {showBot && (
                    <motion.div
                        key="chatbot"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        className="fixed bottom-20 left-14 bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <Chatbot
                            config={config(chatbotId, botName, initialMessages, initialOptions, clearMessages, personalization)}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            headerText="Chatbot"
                            placeholderText="Escribe tu consulta..."
                            messageHistory={loadMessages()}
                        />
                    </motion.div>
                )}
                {showTooltip && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-sm px-3 py-1 rounded-md shadow-lg flex items-center">
                        <span>Necesitas ayuda?</span>
                        <button
                            className="ml-2 text-white"
                            onClick={() => setShowTooltip(false)}
                        >
                            <IoClose size={16} />
                        </button>
                    </div>
                )}
                <button
                    className="bg-indigo-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 active:scale-95"
                    style={{ backgroundColor: personalization[1] || '#5C6BC0' }}
                    onClick={() => toggleBot(prev => !prev)}
                >
                    <FaRobot size={40} />
                </button>
            </div>
        </>
    );
};

export default ChatbotTutorial;

import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import axios from '@/lib/axios';
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';


const ChatbotBubble = ({ chatbotId }) => {
    const [showBot, toggleBot] = useState(false);
    const [botName, setBotName] = useState(null);
    const [initialMessages, setInitialMessages] = useState([]);

    useEffect(() => {
        const fetchBotConfig = async () => {
            try {
                const { data } = await axios.get(`/api/chatbot/${chatbotId}/talk/create`);
                setBotName(data.chatbot?.name || 'Chatbot');

                if (data.chatbot?.intents.length > 0 && data.chatbot.intents[0]?.responses.length > 0) {
                    setInitialMessages([data.chatbot.intents[0].responses[0].response]);
                } else {
                    setInitialMessages(['Hola, en qué puedo ayudarte hoy?']);
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

    const clearMessages = () => {
        localStorage.clear();
        toggleBot(false);
    }

    return (
        <div className="fixed bottom-4 right-8 z-50">
            {showBot && (
                <div className="fixed bottom-20 right-8 bg-white shadow-lg rounded-lg overflow-hidden">
                    <Chatbot
                        config={config(chatbotId, botName, initialMessages, clearMessages)}
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
                className="bg-indigo-400 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
                onClick={() => toggleBot(prev => !prev)}
            >
                <IoChatbubbleEllipsesSharp size={30} />
            </button>
        </div>
    );
};

export default ChatbotBubble;

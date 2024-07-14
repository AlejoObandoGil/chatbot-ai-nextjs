import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const ChatbotBubble = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isChatbotOpen && (
                <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            )}
            <button
                className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
                onClick={toggleChatbot}
            >
                <IoChatbubbleEllipsesSharp size={30} />
            </button>
        </div>
    );
};

export default ChatbotBubble;


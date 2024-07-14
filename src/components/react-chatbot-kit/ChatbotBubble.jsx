import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const ChatbotBubble = ({ chatbotId }) => {
    const [showBot, toggleBot] = useState(false);

    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        return messages;
    };

    // const saveMessages = (messages) => {
    //     localStorage.setItem('chat_messages', JSON.stringify(messages));
    // };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {showBot && (
                <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <Chatbot
                        config={config(chatbotId)}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        headerText='Chatbot'
                        placeholderText='Escribe tu consulta...'
                        messageHistory={loadMessages()}
                        // saveMessages={saveMessages}
                        // validator={validateInput}
                        // runInitialMessagesWithHistory
                        // disableScrollToBottom
                    />
                </div>
            )}
            <button
                className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
                onClick={() => toggleBot((prev) => !prev)}
            >
                <IoChatbubbleEllipsesSharp size={30} />
            </button>
        </div>
    );
};

export default ChatbotBubble;


'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const ChatbotTest = () => {
    const { chatbotId } = useParams();
    useEffect(() => {
        const reactScript = document.createElement('script');
        reactScript.src = 'https://unpkg.com/react/umd/react.production.min.js';
        reactScript.async = true;
        document.body.appendChild(reactScript);

        const reactDOMScript = document.createElement('script');
        reactDOMScript.src = 'https://unpkg.com/react-dom/umd/react-dom.production.min.js';
        reactDOMScript.async = true;
        document.body.appendChild(reactDOMScript);

        reactDOMScript.onload = () => {
            const chatbotScript = document.createElement('script');
            chatbotScript.src = '/chatbot.bundle.js';
            chatbotScript.async = true;
            chatbotScript.onload = () => {
                if (window.renderChatbot && typeof window.renderChatbot === 'function') {
                    window.renderChatbot('chatbot-root', chatbotId);
                } else {
                    console.error('Chatbot script not loaded properly');
                }
            };
            document.body.appendChild(chatbotScript);
        };

        return () => {
            document.body.removeChild(reactScript);
            document.body.removeChild(reactDOMScript);
        };
    }, [chatbotId]);

    return (
        <div>
            <h1>Chatbot Test Page</h1>
            <div id="chatbot-root">Chatbot aqui</div>
        </div>
    );
};

export default ChatbotTest;

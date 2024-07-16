import React from 'react';
import { createRoot } from 'react-dom/client';
import Chatbot from '@/components/react-chatbot-kit/ChatbotBubble.jsx';
import '@/styles/tailwind.css';

window.renderChatbot = (containerId, chatbotId) => {
    const container = document.getElementById(containerId);
    if (container) {
        const root = createRoot(container);
        root.render(<Chatbot chatbotId={chatbotId} />);
    } else {
        console.error(`Container with ID ${containerId} not found`);
    }
};

console.log('Chatbot script loaded');

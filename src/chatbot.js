import React from 'react';
import ReactDOM from 'react-dom';
import Chatbot from '@/components/react-chatbot-kit/ChatbotBubble.jsx';

const renderChatbot = ({ chatbotId }) => {
    ReactDOM.render(
        <Chatbot chatbotId={chatbotId} />,
        document.getElementById('chatbot-container')
    );
};

window.Chatbot = {
    init: renderChatbot,
};

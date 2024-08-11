import React from "react";

import { FaRobot, FaTimes } from 'react-icons/fa';

const BotAvatar = () => {
    return (
        <div className="react-chatbot-kit-chat-bot-avatar">
            <div className="react-chatbot-kit-chat-bot-avatar-container">
                <FaRobot className="react-chatbot-kit-chat-bot-avatar-icon"/>
            </div>
        </div>
    );
};

export default BotAvatar;

import React from "react";

import { FaUser } from 'react-icons/fa';

const UserAvatar = ({ onChangePersonalization }) => {
    return (
        <div className="react-chatbot-kit-user-avatar">
            <div className="react-chatbot-kit-user-avatar-container"
                style={{ backgroundColor: onChangePersonalization[0] || '#7986CB' }}>
                <FaUser className="react-chatbot-kit-user-avatar-icon"/>
            </div>
        </div>
    );
};

export default UserAvatar;

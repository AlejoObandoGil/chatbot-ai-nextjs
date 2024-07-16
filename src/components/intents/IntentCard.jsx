import React from 'react';

const IntentCard = ({ title, description, onClick }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4 cursor-pointer" onClick={onClick}>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default IntentCard;

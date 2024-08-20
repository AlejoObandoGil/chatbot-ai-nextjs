import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { IoMicSharp } from 'react-icons/io5';
// import EventEmitter from '@/hooks/eventEmitter';


const ChatbotHeader = ({ botName, onClearMessages, onChangePersonalization }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    // const [transcript, setTranscript] = useState('');

    // const startRecognition = () => {
    //     // EventEmitter.emit('buttonClicked');
    // };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClearLocalStorage = () => {
        onClearMessages();
        setShowDropdown(false);
    };

    return (
        <div className='relative'>
            <div
                className='flex justify-between items-center w-full text-white p-4'
                style={{ backgroundColor: onChangePersonalization[1] || '#5C6BC0' }}
            >
                {/* <button
                    id="my-button"
                    className="text-white rounded-full w-6 h-6 flex items-center float-right justify-end shadow-lg my-button"
                    onClick={startRecognition}
                >
                    <IoMicSharp size={40} />
                </button> */}
                <div className='flex items-center'>
                    <FaRobot className="mr-2 text-2xl" />
                    <div>{botName}</div>
                </div>
                <button
                    onClick={toggleDropdown}
                    className="text-white hover:text-gray-200"
                    aria-label="Cerrar"
                >
                    <FaTimes />
                </button>
            </div>

            {showDropdown && (
                <div className="absolute top-0 left-0 w-full bg-white text-black p-4 shadow-md z-10">
                    <p>¿Estás seguro de que deseas cerrar el chatbot? Se borrará la conversación actual.</p>
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={toggleDropdown}
                            className="mr-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-700"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleClearLocalStorage}
                            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-700"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotHeader;

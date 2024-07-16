'use client';

import React, { useState } from 'react';
import IntentCard from '@/components/intents/IntentCard';
import Modal from 'react-modal';

const StructurePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedIntent, setSelectedIntent] = useState(null);

    // React.useEffect(() => {
    //     Modal.setAppElement('#__next');
    // }, []);

    const intents = [
        {
            id: 1,
            title: 'Mensaje de bienvenida',
            description: 'Inicia tu chatflow con un mensaje de bienvenida',
        },
        {
            id: 2,
            title: 'Mensaje bot de ejemplo',
            description: 'Cuando nuestro visitante abra el chat, verá este mensaje.',
        },
    ];

    const openModal = (intent) => {
        setSelectedIntent(intent);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedIntent(null);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-8">Estructura del Chatbot</h1>
            {intents.map((intent) => (
                <IntentCard
                    key={intent.id}
                    title={intent.title}
                    description={intent.description}
                    onClick={() => openModal(intent)}
                />
            ))}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar Intent"
                className="bg-white p-8 rounded shadow-md w-full max-w-lg"
                ariaHideApp={false}
            >
                {selectedIntent && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Editar {selectedIntent.title}</h2>
                        <p>{selectedIntent.description}</p>
                        <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                            Cerrar
                        </button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default StructurePage;

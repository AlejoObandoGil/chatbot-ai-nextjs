'use client';

import React, { useState } from 'react';
import IntentCard from '@/components/intents/IntentCard';
import IntentDialog from '@/components/intents/dialog/IntentDialog';
import { Typography } from "@material-tailwind/react";

const StructurePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedIntent, setSelectedIntent] = useState(null);

    const intents = [
        {
            id: 1,
            name: 'Mensaje de bienvenida',
        },
        {
            id: 2,
            name: 'Mensaje bot de ejemplo',
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
            <Typography variant="h4" color="indigo" className='mb-4' textGradient>
                Estructura del Chatbot
            </Typography>
            {intents.map((intent) => (
                <IntentCard
                    key={intent.id}
                    intent={intent}
                    onClick={() => openModal(intent)}
                />
            ))}

            <IntentDialog
                open={modalIsOpen}
                onClose={closeModal}
                intent={selectedIntent}
            />
        </div>
    );
};

export default StructurePage;

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';
import NavbarEditChatbot from '@/components/chatbots/edit/NavBar';
import FormInformation from '@/components/chatbots/create/FormInformation';
import ChatbotFlow from '@/components/react-flow/ChatbotFlow';
import EntitiesIndex from '@/components/entities/EntitiesIndex';
import { Spinner } from "@material-tailwind/react";
import { motion } from 'framer-motion';

const EditChatbot = () => {
    const { id } = useParams();
    const [chatbot, setChatbot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('editor_de_flujo');

    useEffect(() => {
        if (id) {
            axios.get(`/api/v1/chatbot/${id}/edit`)
                .then(response => {
                    setChatbot(response.data.chatbot);
                    setLoading(false);
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error('Error fetching chatbot:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <Spinner />;

    const renderTabContent = () => {
        const variants = {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        };

        const components = {
            informacion: <FormInformation selectedType={chatbot.type} chatbot={chatbot} />,
            personalizacion: <div>Vista Previa - Contenido no disponible</div>,
            editor_de_flujo: <ChatbotFlow chatbotId={chatbot.id}/>,
            entidades: <EntitiesIndex chatbotId={chatbot.id}/>,
            vista_previa: <div>Vista Previa - Contenido no disponible</div>
        };

        return (
            <motion.div
                key={selectedTab}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
            >
                {components[selectedTab]}
            </motion.div>
        );
    };

    return (
        <div>
            <NavbarEditChatbot selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className='mt-5'>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default EditChatbot;

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import FormInformation from '@/components/chatbots/create/FormInformation';
import { Spinner } from "@material-tailwind/react";

const EditChatbot = () => {
    const { id } = useParams();
    const [chatbot, setChatbot] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios.get(`/api/v1/chatbot/${id}/edit`)
                .then(response => {
                    setChatbot(response.data.chatbot);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching chatbot:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <Spinner />;

    return (
        <div>
            <FormInformation selectedType={chatbot.type} chatbot={chatbot} />
        </div>
    );
};

export default EditChatbot;

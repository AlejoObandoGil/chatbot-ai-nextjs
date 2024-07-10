'use client'

import { useState, useEffect } from 'react';
import axios from '@/lib/axios'

const NewChatbot = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [chatbots, setChatbots] = useState([]);

    useEffect(() => {
        const fetchChatbots = async () => {
            try {
                const response = await axios.get('/api/chatbots/index');
                setChatbots(response.data.chatbots);
                console.log('Chatbots fetched:', response.data.chatbots);
            } catch (error) {
                console.error('Error fetching chatbots:', error);
            }
        };

        fetchChatbots(); // Llamar a la función de carga al montar el componente
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/chatbots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (res.ok) {
            console.log('Chatbot created successfully');
        } else {
            console.log('Error creating chatbot');
        }
    };

    return (
        <>
            <ul>
                {chatbots.map(chatbot => (
                    <li key={chatbot.id}>{chatbot.name}: {chatbot.description}</li>
                ))}
            </ul>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6">Nuevo Chatbot</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Nombre del Chatbot</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Descripción</label>
                            <textarea
                                id="description"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Crear Chatbot
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewChatbot;

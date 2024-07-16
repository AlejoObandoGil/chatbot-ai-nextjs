'use client';

import { useState } from 'react';
import axios from '@/lib/axios';

const FormInformation = ({ selectedType }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [link, setLink] = useState('');
    const [document, setDocument] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const data = { name, description, type: selectedType, knowledgeBase };

        if (selectedType === 'PLN') {
            data.link = link;
            data.document = document;
        }

        const { dataResponse } = await axios.post('/api/v1/chatbot', data);

        if (dataResponse.saved) {
            console.log('Chatbot created successfully');
        } else {
            console.log('Error creating chatbot');
        }
    };

    return (
        <>
            <div className=" bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <h2 className="text-2xl font-bold mb-6">Nuevo Chatbot ({selectedType})</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">
                                Nombre del Chatbot
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">
                                Descripción breve
                            </label>
                            <textarea
                                id="description"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="knowledgeBase" className="block text-gray-700">
                                Base de Conocimiento (Información relevante de tu empresa o sitio web)
                            </label>
                            <textarea
                                id="knowledgeBase"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={knowledgeBase}
                                rows={8}
                                onChange={e => setKnowledgeBase(e.target.value)}
                            />
                        </div>
                        {selectedType === 'PLN' && (
                            <div className="mb-4">
                                <label htmlFor="link" className="block text-gray-700">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    id="link"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                />
                            </div>
                        )}
                        {selectedType === 'PLN' && (
                            <div className="mb-4">
                                <label htmlFor="document" className="block text-gray-700">
                                    Documento
                                </label>
                                <input
                                    type="file"
                                    id="link"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={document}
                                    onChange={e => setDocument(e.target.value)}
                                />
                            </div>
                        )}
                        <button type="submit" className="w-full max-w-lg float-right bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Crear Chatbot
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormInformation;

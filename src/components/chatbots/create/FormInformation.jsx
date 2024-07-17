import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Alert } from "@material-tailwind/react";
import { Input, Textarea, Typography } from "@material-tailwind/react";

const FormInformation = ({ selectedType, chatbot }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [link, setLink] = useState('');
    const [document, setDocument] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (chatbot) {
            setName(chatbot.name || '');
            setDescription(chatbot.description || '');
            setKnowledgeBase(chatbot.knowledgeBase || '');
            setLink(chatbot.link || '');
            setDocument(chatbot.document || '');
            selectedType = chatbot.type;
        }
    }, [chatbot]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { name, description, type: selectedType, knowledgeBase };

        if (selectedType === 'PLN') {
            data.link = link;
            data.document = document;
        }

        try {
            let response;
            if (chatbot) {
                response = await axios.put(`/api/v1/chatbot/${chatbot.id}`, data);
            } else {
                response = await axios.post('/api/v1/chatbot', data);
            }

            if (response.status === 200 || response.status === 201) {
                setAlertMessage(response.data.message);
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    router.replace('/chatbots/edit/structure');
                }, 3000);
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            console.error('Error:', error);
            handleErrorResponse(error.response);
        }
    };

    const handleErrorResponse = (response) => {
        if (response && response.data && response.data.message) {
            setAlertMessage(response.data.message);
        } else {
            setAlertMessage('Error al guardar el chatbot.');
        }
        setAlertColor('red');
        setShowAlert(true);
    };

    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <Typography variant="h5" color="blue-gray" className='mb-4' textGradient>
                        {chatbot ? `Editar Chatbot (${selectedType})` : `Nuevo Chatbot (${selectedType})`}
                    </Typography>
                    <form onSubmit={handleSubmit} className='mb-4'>
                        <div className="mb-4">
                            <Input
                                label="Nombre del Chatbot"
                                variant="standard"
                                type="text"
                                color="indigo"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Nombre del Chatbot"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                label="Descripción breve del Chatbot"
                                variant="outlined"
                                color="indigo"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <Typography variant="h6" color="blue-gray" className='mb-4' textGradient>
                            Por favor, añade información adicional sobre tu empresa o negocio.
                            Esta debe ser relevante y tiene el propósito de entrenar al chatbot para mejorar la interacción con sus clientes.
                            Pudes Agregar texto, un archivo PDF o un enlace de sitio web.
                        </Typography>
                        <div className="mb-4">
                            <Textarea
                                label="Base de Conocimiento"
                                variant="outlined"
                                color="indigo"
                                value={knowledgeBase}
                                onChange={e => setKnowledgeBase(e.target.value)}
                            />
                        </div>
                        {selectedType === 'PLN' && (
                            <>
                                <div className="mb-4">
                                    <Input
                                        label="Link sitio web"
                                        variant="standard"
                                        type="text"
                                        color="indigo"
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                        placeholder="Agrega el link de tu sitio web"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Documento PDF"
                                        variant="standard"
                                        type="file"
                                        color="indigo"
                                        value={document}
                                        onChange={e => setDocument(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <button type="submit" className="w-full max-w-lg float-right bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            {chatbot ? 'Actualizar Chatbot' : 'Crear Chatbot'}
                        </button>
                    </form>
                    <div className="mt-4 mb-4">
                        {showAlert && (
                            <div>
                                <Alert color={alertColor}>
                                    {alertMessage}
                                </Alert>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormInformation;

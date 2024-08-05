import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Alert, Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { formatErrorMessage } from '@/utils/alertUtils';

const FormInformation = ({ selectedType, chatbot }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [link, setLink] = useState('');
    const [document, setDocument] = useState(null);
    const [temperature, setTemperature] = useState('');
    const [maxTokens, setMaxTokens] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [loadingSave, setloadingSave] = useState(false);

    useEffect(() => {
        if (chatbot) {
            setName(chatbot.name || '');
            setDescription(chatbot.description || '');
            setKnowledgeBase(chatbot.knowledgeBase || '');
            setLink(chatbot.link || '');
            setTemperature(chatbot.temperature || '');
            setMaxTokens(chatbot.maxTokens || '');
        }
    }, [chatbot]);

    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloadingSave(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('type', selectedType);

        if (selectedType === 'PLN') {
            formData.append('knowledgeBase', knowledgeBase);
            formData.append('link', link);
            formData.append('temperature', temperature);
            formData.append('maxTokens', maxTokens);
            if (document) {
                formData.append('document', document);
            }
        }

        try {
            let response;
            if (chatbot) {
                response = await axios.put(`/api/v1/chatbot/${chatbot.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post('/api/v1/chatbot', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            if (response.status === 200 || response.status === 201) {
                setAlertMessage(response.data.message);
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    router.replace(`/chatbots/${response.data.chatbot.id}/edit`);
                }, 1500);
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
            handleErrorResponse(error.response);
        } finally {
            setloadingSave(false);
        }
    };

    const handleErrorResponse = (response) => {
        const alertMessage = formatErrorMessage(response);
        setAlertMessage(alertMessage);
        setAlertColor('red');
        setShowAlert(true);
    };

    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-5xl">
                    <Typography variant="h4" color="indigo" className='mb-4' textGradient>
                        {chatbot ? `Editar Información del Chatbot (${selectedType})` : `Nuevo Chatbot (${selectedType})`}
                    </Typography>
                    <form onSubmit={handleSubmit} className='mb-4' encType="multipart/form-data">
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
                                label="Instrucciones del Chatbot (Por ejemplo: Eres un chatbot de ventas. Responde preguntas sobre productos y servicios.)"
                                placeholder=''
                                variant="outlined"
                                color="indigo"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        {selectedType === 'PLN' || selectedType === 'Híbrido' && (
                            <>
                                <Typography variant="h6" color="blue-gray" className='mb-4' textGradient>
                                    Por favor, proporciona información adicional sobre tu empresa o negocio.
                                    Esta información es fundamental para entrenar al chatbot con el modelo de Open AI y mejorar la calidad de las interacciones con tus clientes.
                                    El chatbot utilizará los datos que proporciones para ofrecer respuestas más precisas y personalizadas.
                                    Puedes agregar texto, subir un archivo PDF, o incluir un enlace a tu sitio web.
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
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Typography variant="h6" color="blue-gray" className='mb-4' textGradient>
                                        Controla el nivel de creatividad y diversidad en las respuestas generadas por el modelo de OpenAI.
                                        0.0 (más determinista) a 1.0 (más creativa).
                                    </Typography>
                                    <Input
                                        label="Temperatura (0.0 - 1.0)"
                                        variant="standard"
                                        type="number"
                                        step="0.1"
                                        color="indigo"
                                        value={temperature}
                                        onChange={e => setTemperature(e.target.value)}
                                        placeholder="Temperatura"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <Typography variant="h6" color="blue-gray" className='mb-4' textGradient>
                                        Define el límite superior para la longitud de las respuestas generadas por el modelo.
                                    </Typography>
                                    <Input
                                        label="Cantidad Máxima de Tokens"
                                        variant="standard"
                                        type="number"
                                        color="indigo"
                                        value={maxTokens}
                                        onChange={e => setMaxTokens(e.target.value)}
                                        placeholder="Cantidad Máxima de Tokens"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <Button type="submit" variant="gradient" color='indigo' size="md" loading={loadingSave}>
                            {chatbot ? 'Actualizar Chatbot' : 'Crear Chatbot'}
                        </Button>
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

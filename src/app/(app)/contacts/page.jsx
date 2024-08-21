'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import TalksDetailsTable from '@/components/contacts/TalksDetailsTable';

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    Select,
    Option,
    Button
} from '@material-tailwind/react';

export default function TalksTable() {
    const [talks, setTalks] = useState([]);
    const [chatbots, setChatbots] = useState([]);
    const [selectedChatbotId, setSelectedChatbotId] = useState('');
    const [expandedTalk, setExpandedTalk] = useState(null);

    useEffect(() => {
        const fetchChatbots = async () => {
            try {
                const { data } = await axios.get('/api/v1/chatbot');
                setChatbots(data.chatbots);
            } catch (error) {
                console.error('Error fetching chatbots:', error);
            }
        };

        fetchChatbots();
    }, []);

    useEffect(() => {
        if (selectedChatbotId) {
            const fetchTalks = async () => {
                try {
                    const { data } = await axios.get(`/api/v1/chatbot/${selectedChatbotId}/contact-information`);
                    setTalks(data.talks);
                } catch (error) {
                    console.error('Error fetching talks:', error);
                }
            };

            fetchTalks();
        }
    }, [selectedChatbotId]);

    const handleToggleDetails = (talkId) => {
        setExpandedTalk(expandedTalk === talkId ? null : talkId);
    };

    const handleStatusChange = async (index, currentStatus, id) => {
        setTalks(prevTalks => {
            const updatedTalks = [...prevTalks];

            updatedTalks[index].contact_information[0].status =
                currentStatus === 'sin contactar'
                    ? 'contacto exitoso'
                    : currentStatus === 'contacto exitoso'
                    ? 'contacto no exitoso'
                    : 'sin contactar';

            return updatedTalks;
        });

        try {
            if (id !== null)
                await axios.put(`/api/v1/chatbot/${selectedChatbotId}/contact-information/${id}`, {
                    status: talks[index].contact_information[0].status
                });
        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
    };

    return (
        <Card className="h-full w-full p-6">
            <Typography variant="h5" color="indigo" className="text-center">
                Administración de Relaciones con el Cliente (CRM)
            </Typography>
            <div className="w-1/3 mb-6 mt-4">
                <Select
                    label="Selecciona un Chatbot"
                    value={selectedChatbotId}
                    onChange={(value) => setSelectedChatbotId(value)}
                >
                    {chatbots.map((chatbot) => (
                        <Option key={chatbot.id} value={chatbot.id}>
                            {chatbot.name}
                        </Option>
                    ))}
                </Select>
            </div>
            {selectedChatbotId ? (
                <>
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex justify-center items-center text-center">
                            <Typography variant="h6" color="indigo" className="w-full">
                                Lista de conversaciones de clientes
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0 mb-4">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Intención del cliente
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Información pedida al cliente
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Información recibida del cliente
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Fecha de Inicio
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Fecha de Actualización
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Acciones
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {talks.map((talk, index) => (
                                    <tr key={talk.id}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {talk?.contact_information[0]?.intent?.name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {talk?.contact_information[0]?.intent?.information_required}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {talk?.contact_information[0]?.value}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(talk.started_at).toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(talk.ended_at).toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                        <Button
                                            size="sm"
                                            variant='gradient'
                                            color='green'
                                            className="mx-2"
                                            onClick={() => handleStatusChange(index, talk.contact_information[0].status, talk.contact_information[0].id)}
                                        >
                                            {talk.contact_information[0].status}
                                        </Button>
                                            <Button color="dark" variant="gradient" size="sm" className='mx-2' onClick={() => handleToggleDetails(talk.id)}>
                                                {expandedTalk === talk.id ? 'Ver menos' : 'Ver más'}
                                            </Button>
                                            <Link href={{ pathname: `/contacts/talk/${talk.id}`, query: { chatbotId: selectedChatbotId } }}>
                                                <Button color="indigo" variant="gradient" size="sm">
                                                    Ver chat
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>

                    {expandedTalk && (
                        <CardBody className="mt-4 p-0">
                            <TalksDetailsTable contactInformation={talks.find(talk => talk.id === expandedTalk)?.contact_information || []} />
                        </CardBody>
                    )}

                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </>
            ) : (
                <Typography variant="h6" color="blue-gray" className="text-center mt-4">
                    Selecciona un chatbot para listar las conversaciones
                </Typography>
            )}
        </Card>
    );
}

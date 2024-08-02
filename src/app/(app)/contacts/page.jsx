'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from '@/lib/axios';

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Select,
    Option
} from '@material-tailwind/react';

export default function ContactTable() {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [chatbots, setChatbots] = useState([]);
    const [selectedChatbotId, setselectedChatbotId] = useState('');

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
            const fetchContactInformations = async () => {
                try {
                    const { data } = await axios.get(`/api/v1/chatbot/${selectedChatbotId}/contact-information`);

                    const columns = ['Status', ...data.intents.map(intent => intent.name), 'Acciones'];
                    setColumns(columns);

                    const allContacts = data.intents.flatMap(intent =>
                        intent.contact_informations.map(contact => ({
                            ...contact,
                            intentName: intent.name
                        }))
                    );

                    const rows = allContacts.reduce((acc, contact) => {
                        const existingRow = acc.find(row => row.id === contact.id);
                        if (existingRow) {
                            existingRow[contact.intentName] = contact.value;
                        } else {
                            const newRow = {
                                id: contact.id,
                                Status: contact.status || 'sin contactar',
                                talk: contact.talk,
                                [contact.intentName]: contact.value
                            };
                            acc.push(newRow);
                        }
                        return acc;
                    }, []);

                    setRows(rows);

                } catch (error) {
                    console.error('Error fetching contact information:', error);
                }
            };

            fetchContactInformations();
        }
    }, [selectedChatbotId]);

    const handleStatusChange = (index) => {
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            const currentStatus = updatedRows[index].status;
            const statusOrder = ['sin contactar', 'contacto exitoso', 'contacto no exitoso'];
            const newStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
            updatedRows[index].status = newStatus;
            return updatedRows;
        });
    };

    const getStatusColor = (status) => {
        if (status === 'contacto exitoso') return 'bg-green-500';
        if (status === 'contacto no exitoso') return 'bg-red-500';
        return 'bg-gray-500';
    };

    return (
        <Card className="h-full w-full p-6">
            <Typography variant="h5" color="indigo" className='text-center'>
                Administración de Relaciones con el Cliente (CRM)
            </Typography>
            <div className="w-1/3 mb-6 mt-4">
                <Select
                    label="Selecciona un Chatbot"
                    value={selectedChatbotId}
                    onChange={(value) => setselectedChatbotId(value)}
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
                    <CardHeader floated={false} shadow={false} className="rounded-none mb-4">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full md:w-72">
                                <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0 mb-4">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead>
        <tr>
            {columns.map((column) => (
                <th
                    key={column}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                        {column} <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    </Typography>
                </th>
            ))}
        </tr>
    </thead>
    {rows && rows.length !== 0 && (
        <tbody>
            {rows.map((row, index) => {
                const isLast = index === rows.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                    <tr key={row.id}>
                        {columns.map((column) => (
                            <td key={column} className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {column === 'Status' ? (
                                        <Button
                                            className={`text-white ${getStatusColor(row.Status)}`}
                                            onClick={() => handleStatusChange(index)}
                                        >
                                            {row.Status}
                                        </Button>
                                    ) : column === 'Acciones' ? (
                                        row.talk?.id && (
                                            <Link href={{
                                                pathname: `/contacts/talk/${row.talk.id}`,
                                                query: { chatbotId: selectedChatbotId }
                                            }}>
                                                <Button color="indigo" variant="gradient">
                                                    Ver chat
                                                </Button>
                                            </Link>
                                        )
                                    ) : (
                                        row[column] || '""'
                                    )}
                                </Typography>
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    )}
</table>

                    </CardBody>
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
                    Selecciona un chatbot para listar la información de contacto de tus clientes
                </Typography>
            )}
        </Card>
    );
}

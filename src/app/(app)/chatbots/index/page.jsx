'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Button, Card, Typography } from '@material-tailwind/react';
import Link from 'next/link';

const ChatbotsIndex = () => {
    const [chatbots, setChatbots] = useState([]);

    useEffect(() => {
        const fetchChatbots = async () => {
            try {
                const response = await axios.get('/api/v1/chatbot');
                setChatbots(response.data.chatbots);
            } catch (error) {
                console.error('Error fetching chatbots:', error);
            }
        };

        fetchChatbots();
    }, []);

    const TABLE_HEAD = ['Nombre', 'Descripción', 'Tipo', 'Habilitado', 'Fecha de creación', 'Fecha de actualización', 'Acciones'];

    return (
        <>
            <Typography variant="h5" color="indigo" className='text-center'>Lista de chatbots</Typography>
            <Card className="h-full w-full overflow-scroll mt-4">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map(head => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {chatbots.map((chatbot, index) => {
                            const isLast = index === chatbots.length - 1;
                            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                            return (
                                <tr key={chatbot.id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {chatbot.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {chatbot.description}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {chatbot.type}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {chatbot.enabled ? 'Yes' : 'No'}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(chatbot.created_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(chatbot.updated_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex space-x-2">
                                            <Link href={`/chatbots/${chatbot.id}/edit`} passHref>
                                                <Button color="indigo" size="sm">
                                                    Editar
                                                </Button>
                                            </Link>
                                            {/* <Link href={`/chatbots/${chatbot.id}/show`} passHref>
                                                <Button color="green" size="sm">
                                                    Vista previa
                                                </Button>
                                            </Link> */}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    );
};

export default ChatbotsIndex;

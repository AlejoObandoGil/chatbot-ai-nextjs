'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from '@/lib/axios';
import { Button, Card, Typography } from '@material-tailwind/react';
import Link from 'next/link';

const TalkIndex = () => {
    const searchParams = useSearchParams();
    const { id } = useParams();
    const [chatbotId] = useState(searchParams.get('chatbotId'));
    const [talk, setTalk] = useState({ messages: [] });

    useEffect(() => {
        const fetchTalk = async () => {
            try {
                const { data } = await axios.get(`/api/v1/chatbot/${chatbotId}/talk/${id}`);
                setTalk(data.talk || { messages: [] });
            } catch (error) {
                console.error('Error fetching Talk:', error);
            }
        };

        fetchTalk();
    }, [chatbotId, id]);

    const TABLE_HEAD = ['Enviado por', 'Mensaje', 'Fecha de creación', 'Fecha de actualización'];

    return (
        <>
            { talk && talk.messages.length > 0 &&
                <div>
                    <Typography variant="h5" color="indigo" className='text-center'>Lista de Mensajes del chat</Typography>
                    <Link href={{
                            pathname: `/contacts`,
                        }}>
                        <Button color="indigo" variant="gradient">
                            Volver
                        </Button>
                    </Link>
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
                                {talk.messages.map((talkMessage, index) => {
                                    const isLast = index === talk.messages.length - 1;
                                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                    return (
                                        <tr key={talkMessage.id}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {talkMessage.sender}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {talkMessage.message}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {new Date(talkMessage.created_at).toLocaleString()}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {new Date(talkMessage.updated_at).toLocaleString()}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>
            }
        </>
    );
};

export default TalkIndex;

'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from '@/lib/axios';
import { Card, Typography } from '@material-tailwind/react';

const TalkIndex = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const { talkId } = params;
    const chatbotId = searchParams.get('chatbotId');
    const [talk, setTalk] = useState([]);

    useEffect(() => {
        const fetchTalk = async () => {
            try {
                const response = await axios.get(`/api/v1/chatbot/${chatbotId}/talk/${talkId}`);
                setTalk(response.data.talk);
            } catch (error) {
                console.error('Error fetching Talk:', error);
            }
        };

        if (chatbotId && talkId) {
            fetchTalk();
        }
    }, [chatbotId, talkId]);

    const TABLE_HEAD = ['Enviado por', 'Mensaje', 'Fecha de creación', 'Fecha de actualización'];

    return (
        <>
            <Typography variant="h5" color="indigo" className='text-center'>Lista de Mensajes del chat</Typography>
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
                        {talk.map((talkItem, index) => {
                            const isLast = index === talk.length - 1;
                            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                            return (
                                <tr key={talkItem.id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {talkItem.sender}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {talkItem.message}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(talkItem.created_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(talkItem.updated_at).toLocaleDateString()}
                                        </Typography>
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

export default TalkIndex;

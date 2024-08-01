'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Button, Card, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import EntityDialog from './dialog/EntityDialog';

const EntitiesIndex = ({chatbotId}) => {
    const [entities, setEntities] = useState([]);
    const [modalEntityIsOpen, setModalEntityIsOpen] = useState(false);

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await axios.get(`/api/v1/chatbot/${chatbotId}/entity`);
                setEntities(response.data.entities);
            } catch (error) {
                console.error('Error fetching entities:', error);
            }
        };

        fetchEntities();
    }, [chatbotId]);

    const openModal = () => {
        setModalEntityIsOpen(true);
    };

    const closeModal = () => {
        setModalEntityIsOpen(false);
    };

    const handleEntitySave = (entity) => {
        setEntities([...entities, entity]);
        closeModal();
    };

    const TABLE_HEAD = ['Nombre', 'Tipo de dato', 'Fecha de creación', 'Fecha de actualización', 'Acciones'];

    return (
        <>
            <Button type="submit" variant="gradient" color='indigo' size="md" onClick={openModal}>
                Agregar nueva entidad
            </Button>

            <Typography variant="h5" color="indigo" className="font-normal m-5">
                Lista de entidades
            </Typography>
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
                        {entities.map((entity, index) => {
                            const isLast = index === entities.length - 1;
                            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                            return (
                                <tr key={entity.id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {entity.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {entity.datatype}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(entity.created_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {new Date(entity.updated_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex space-x-2">
                                            <Link href={`/entities/${entity.id}/edit`} passHref>
                                                <Button color="blue" size="sm">
                                                    Editar
                                                </Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            {modalEntityIsOpen &&
            <EntityDialog
                chatbotId={chatbotId}
                open={modalEntityIsOpen}
                onClose={closeModal}
                onSave={handleEntitySave}
            />}
        </>
    );
};

export default EntitiesIndex;

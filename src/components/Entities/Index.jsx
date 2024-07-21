'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Button, Card, Typography, Input } from '@material-tailwind/react';
import Link from 'next/link';

const EntitiesIndex = () => {
    const [entities, setEntities] = useState([]);
    const [entity, setEntity] = useState({});

    // useEffect(() => {
    //     const fetchEntities = async () => {
    //         try {
    //             const response = await axios.get('/api/v1/entity');
    //             setEntities(response.data.entities);
    //             console.log('Entities fetched:', response.data.entities);
    //         } catch (error) {
    //             console.error('Error fetching entities:', error);
    //         }
    //     };

    //     fetchEntities();
    // }, []);

    const TABLE_HEAD = ['Nombre', 'Tipo de dato', 'Fecha de creación', 'Fecha de actualización', 'Acciones'];

    return (
        <>
            {/* <h1>Lista de entidades</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Escribe el nombre de la entidad. Por ejemplo: 'Cédula', 'Edad', 'Nombre'"
                    name="name"
                    value={entity.name}
                    onChange={e => setName(e.target.value)}
                    required
                    color="indigo"
                    variant="standard"
                />
                <Select
                    variant="standard"
                    label="Seleccione el tipo de dato"
                    name="datatype"
                    value={entity.datatype}
                    onChange={e => setName(e.target.value)}
                    required>
                        <Option>String</Option>
                        <Option>Integer</Option>
                        <Option>Float</Option>
                        <Option>Boolean</Option>
                </Select>
                <Button type="submit" variant="gradient" color='indigo' size="md"  loading={loadingSave}>
                    {entity.id ? 'Actualizar Entidad' : 'Agregar Entidad'}
                </Button>
            </form> */}

            <Card className="h-full w-full overflow-scroll">
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
        </>
    );
};

export default EntitiesIndex;

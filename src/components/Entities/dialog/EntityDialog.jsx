import React, { useState } from 'react';
import axios from '@/lib/axios';
import { formatErrorMessage } from '@/utils/alertUtils.js';
import { Dialog, DialogHeader, DialogBody, Typography, Select, Option, Input, Button, Alert } from "@material-tailwind/react";

const EntityDialog = ({ chatbotId, open, onClose, onSave }) => {
    const [entity, setEntity] = useState({});
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [loadingSave, setloadingSave] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloadingSave(true);

        try {
            let response = await axios.post(`/api/v1/chatbot/${chatbotId}/entity`, entity);

            if (response.status === 200 || response.status === 201) {
                setAlertMessage(response.data.message);
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    onSave();
                }, 5000);
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
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
        <Dialog open={open} handler={onClose} size="xl" className='px-4 py-4'>
            {entity && (
                <>
                    <DialogHeader>
                        <div className="flex flex-col w-full">
                            <div className="flex items-start">
                                <Typography variant="h5" color="indigo">
                                {entity.id ? 'Editar Entidad' : 'Agregar Entidad'}
                                </Typography>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogBody className="custom-scroll max-h-[calc(100vh-200px)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Escribe el nombre de la entidad. Por ejemplo: 'Cédula', 'Edad', 'Nombre'"
                                name="name"
                                value={entity.name}
                                onChange={e => setEntity(e.target.value)}
                                required
                                color="indigo"
                                variant="standard"
                            />
                            <Select
                                variant="standard"
                                label="Seleccione el tipo de dato"
                                name="datatype"
                                value={entity.datatype}
                                onChange={e => setEntity(e.target.value)}
                                required>
                                    <Option>String</Option>
                                    <Option>Integer</Option>
                                    <Option>Float</Option>
                                    <Option>Boolean</Option>
                            </Select>
                            <Button
                                variant='gradient'
                                className='me-2'
                                color="indigo"
                                onClick={onClose}
                            >
                                Cerrar
                            </Button>
                            <Button
                                type="submit"
                                variant="gradient"
                                color='indigo'
                                size="md"
                                loading={loadingSave}>
                                    {entity.id ? 'Actualizar Entidad' : 'Guardar Entidad'}
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
                    </DialogBody>
                </>
            )}
        </Dialog>
    );
};

export default EntityDialog;

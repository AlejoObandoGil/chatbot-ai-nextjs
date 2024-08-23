import React, { useState } from 'react';
import IntentForm from './IntentForm';
import { Dialog, DialogHeader, DialogBody, Typography } from "@material-tailwind/react";
import VideoModal from '@/components/video/VideoModal';

const IntentDialog = ({ chatbotId, node, typeInformationRequired, open, onClose, onSave }) => {
    const [formData, setFormData] = useState(node);

    const handleFormChange = (updatedData) => {
        setFormData(updatedData);
    };

    const handleFormSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} handler={onClose} size="xl" className='px-4 py-4'>
            {node && (
                <>
                    <DialogHeader>
                        <div className="flex flex-col w-full">
                            <div className="flex items-start justify-between">
                                <Typography variant="h5" color="indigo">
                                    Editar Nodo
                                </Typography>
                                <div className="flex">
                                    <VideoModal
                                        nameButton="Tutorial crear nodo simple"
                                        titleModal="Tutorial explicativo sobre creación de un nodo de basado en las intenciones que escriben los usuarios"
                                        link="https://drive.google.com/file/d/1sQZDIXQokqj79civwDY_R71UsOVHM6bO/preview"
                                    />
                                    <div className='mr-2'></div>
                                    <VideoModal
                                        nameButton="Tutorial crear nodo opciones"
                                        titleModal="Tutorial explicativo sobre creación de un nodo de tipo selección multiple"
                                        link="https://drive.google.com/file/d/1BXTRWd1q1o-Hb2FAPz0Xh5pYcMi2x9oq/preview"
                                    />
                                    <div className='mr-2'></div>
                                    <VideoModal
                                        nameButton="Tutorial crear nodo guardar"
                                        titleModal="Tutorial explicativo sobre creación de un nodo para guardar la información del usuario en CRM"
                                        link="https://drive.google.com/file/d/1csm8eaoNYhSKwYKH9esGhUFaS-r7W4iD/preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogBody className="custom-scroll max-h-[calc(100vh-200px)]">
                        <IntentForm
                            chatbotId={chatbotId}
                            typeInformationRequired={typeInformationRequired}
                            node={formData}
                            onChange={handleFormChange}
                            onSave={handleFormSubmit}
                            onClose={onClose} />
                    </DialogBody>
                </>
            )}
        </Dialog>
    );
};

export default IntentDialog;

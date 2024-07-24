import React, { useState } from 'react';
import IntentForm from './IntentForm';
import { Dialog, DialogHeader, DialogBody, Typography, DialogFooter } from "@material-tailwind/react";

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
                            <div className="flex items-start">
                                <Typography variant="h5" color="indigo">
                                    Editar Nodo
                                </Typography>
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
                    {/* <DialogFooter
                    >Hola</DialogFooter> */}
                </>
            )}
        </Dialog>
    );
};

export default IntentDialog;

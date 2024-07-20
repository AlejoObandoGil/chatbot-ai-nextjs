import React, { useState, useEffect } from 'react';
import IntentForm from './IntentForm';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";

const IntentDialog = ({ open, onClose, node }) => {
    console.log('ok', node);

    const [formData, setFormData] = useState(node);

    console.log('formdata', formData);

    const handleFormChange = (updatedData) => {
        setFormData(updatedData);
    };

    return (
        <Dialog open={open} handler={onClose} size="lg" className='px-4 py-4'>
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
                        <IntentForm node={formData} onChange={handleFormChange} />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant='gradient'
                            className='me-2'
                            color="indigo"
                            onClick={onClose}
                        >
                            Cerrar
                        </Button>
                        <Button
                            variant='gradient'
                            color="indigo"
                            onClick={onClose}
                        >
                            Guardar
                        </Button>
                    </DialogFooter>
                </>
            )}
        </Dialog>
    );
};

export default IntentDialog;

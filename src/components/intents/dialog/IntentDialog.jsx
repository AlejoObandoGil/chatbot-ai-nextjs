import React, { useState } from 'react';
// import IntentNavBarDialog from './IntentNavBarDialog'
import IntentForm from './IntentForm'
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";

const IntentDialog = ({ open, onClose, intent }) => {

    const [formData, setFormData] = useState(intent);

    const handleFormChange = (updatedData) => {
        setFormData(updatedData);
    };

    return (
        <Dialog open={open} handler={onClose} size="lg" className='px-4 py-4'>
            {intent && (
                <>
                    <DialogHeader>
                    <div className="flex flex-col w-full">
                            <div className="flex items-start">
                                <Typography variant="h5" color="indigo">
                                    Editar {intent.name}
                                </Typography>
                            </div>
                            {/* <div className="flex justify-center w-full mt-4">
                                <IntentNavBarDialog />
                            </div> */}
                        </div>
                    </DialogHeader>
                    <DialogBody className="custom-scroll max-h-[calc(100vh-200px)]">
                        <IntentForm intent={formData} onChange={handleFormChange} />
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

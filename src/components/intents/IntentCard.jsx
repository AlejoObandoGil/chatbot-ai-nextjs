import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

const IntentCard = ({ intent, onClick }) => {
    return (
        <Card className="w-full max-w-md mt-5 mb-5 cursor-pointer" onClick={onClick}>
            <CardBody className="h-48 overflow-y-auto text-center">
                <Typography variant="small" color="gray" className="mt-2">
                    {(intent.id === 1 || !intent) ? `Inicia el chabtot con un mensaje de bienvenida` : '¿Cual es tu siguiente enunciado?'}
                </Typography>
                <Typography variant="h5" color="indigo" textGradient className='mt-4'>
                    {intent.name}
                </Typography>
            </CardBody>
        </Card>
    );
};

export default IntentCard;



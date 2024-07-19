'use client';

import { useState } from 'react';
import CardSelection from '@/components/chatbots/create/CardSelection';
import FormInformation from '@/components/chatbots/create/FormInformation';
import { Button } from "@material-tailwind/react";


const ChatbotCreate = () => {
    const [selectedType, setSelectedType] = useState('');

    const handleSelect = type => {
        setSelectedType(type);
    };

    const handleGoBack = () => {
        setSelectedType('');
    };

    return (
        <div className="p-4">
            {selectedType === '' ? (
                <CardSelection onSelect={handleSelect} />
            ) : (
                <div>
                    <div className='flex justify-start'>
                        <Button onClick={handleGoBack} type="submit" variant="gradient" color='indigo' size="md">
                            Volver
                        </Button>
                    </div>

                    <FormInformation selectedType={selectedType} />
                </div>
            )}
        </div>
    );
};

export default ChatbotCreate;


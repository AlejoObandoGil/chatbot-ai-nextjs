'use client';

import { useState } from 'react';
import CardSelection from '@/components/chatbots/create/CardSelection';
import FormInformation from '@/components/chatbots/create/FormInformation';

const ChatbotCreate = () => {
    const [selectedType, setSelectedType] = useState('');

    const handleSelect = type => {
        setSelectedType(type);
    };

    return <>{selectedType === '' ? <CardSelection onSelect={handleSelect} /> : <FormInformation selectedType={selectedType} />}</>;
};

export default ChatbotCreate;

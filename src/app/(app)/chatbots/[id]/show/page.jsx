'use client';

import { useParams } from 'next/navigation';
import 'react-chatbot-kit/build/main.css';
import Preview from '@/components/chatbots/show/Preview.jsx';

export default function ChatbotShow() {
    const { id } = useParams();

    return (
        <>
            <Preview chatbotId={id} />
        </>
    );
}

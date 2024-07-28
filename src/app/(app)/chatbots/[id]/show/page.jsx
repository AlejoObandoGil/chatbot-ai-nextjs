'use client';

import { useParams } from 'next/navigation';
import 'react-chatbot-kit/build/main.css';
import ChatbotPreview from '@/components/chatbots/show/ChatbotPreview.jsx';

export default function ChatbotShow() {
    const { id } = useParams();

    return (
        <>
            <ChatbotPreview chatbotId={id} />
        </>
    );
}

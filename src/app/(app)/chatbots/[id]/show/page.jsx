'use client';

import { useParams } from 'next/navigation';
import 'react-chatbot-kit/build/main.css';
import ChatbotBubble from '@/components/react-chatbot-kit/ChatbotBubble.jsx';

export default function ChatbotShow() {
    const { id } = useParams();

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Vista previa del Chatbot</h2>
                <p>ID del Chatbot: {id}</p>

                <ChatbotBubble chatbotId={id} />
            </div>
        </div>
    );
}

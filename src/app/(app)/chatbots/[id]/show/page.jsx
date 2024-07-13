'use client'

import { useParams } from 'next/navigation'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from '@/components/react-chatbot-kit/config.js';
import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';

export default function ChatbotShowPage() {
    const { id } = useParams()

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Vista previa del Chatbot</h2>
                <p>ID del Chatbot: {id}</p>

                <div>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            </div>
        </div>
    )
}

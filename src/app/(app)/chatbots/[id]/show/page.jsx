'use client'

import { useParams } from 'next/navigation'

export default function ChatbotShowPage() {
    const { id } = useParams()

    return (
        <div>
            <h1>Detalles del Chatbot</h1>
            <p>ID del Chatbot: {id}</p>
        </div>
    )
}

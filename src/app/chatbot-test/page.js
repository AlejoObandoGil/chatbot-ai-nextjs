'use client'

import { useEffect } from 'react'

const ChatbotTest = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = '/chatbot.bundle.js'
        script.async = true
        script.onload = () => {
            if (window.Chatbot && typeof window.Chatbot.init === 'function') {
                window.Chatbot.init({
                    chatbotId: 1,
                })
            } else {
                console.error('Chatbot script not loaded properly');
            }
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div>
            <h1>Chatbot Test Page</h1>
            <div id="chatbot-container"></div>
        </div>
    )
}

export default ChatbotTest

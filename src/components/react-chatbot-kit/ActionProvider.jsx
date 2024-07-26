import axios from '@/lib/axios';
import { createClientMessage } from 'react-chatbot-kit';

class ActionProvider {
    constructor(createChatBotMessage, setState, config, stateRef) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setState;
        this.config = config;
        this.stateRef = stateRef;
        this.talkId = JSON.parse(localStorage.getItem('talk_id'));
        this.intentId = JSON.parse(localStorage.getItem('intent_id')) ?? null;
    }

    async handleMessage(message) {
        if (!this.talkId) {
            try {
                const { data } = await axios.post(`/api/chatbot/${this.stateRef.chatbotId}/talk`, {});
                if (data) {
                    this.talkId = data.talkId;
                    localStorage.setItem('talk_id', JSON.stringify(this.talkId));
                }
            } catch (error) {
                console.error('Error al crear la conversación:', error);
                return;
            }
        }

        try {
            const { data } = await axios.post(`/api/chatbot/${this.stateRef.chatbotId}/talk/${this.talkId}/message/${this.intentId}`, message);

            if (data) {
                const botResponse = typeof data.response === 'object' && data.response !== null
                    ? data.response.response
                    : data.response;
                this.setBotMessage(botResponse);

                const savedMessages = JSON.parse(localStorage.getItem('chat_messages')) || [];
                const newMessageUser = createClientMessage(message.message);
                savedMessages.push(newMessageUser);
                localStorage.setItem('chat_messages', JSON.stringify(savedMessages));

                const newMessageBot = this.createChatBotMessage(botResponse);
                savedMessages.push(newMessageBot);
                localStorage.setItem('chat_messages', JSON.stringify(savedMessages));

                if (typeof data.response === 'object' && data.response?.intent) {
                    this.intentId = data.response.intent.id;
                    localStorage.setItem('intent_id', JSON.stringify(this.intentId));
                }
            }
        } catch (error) {
            console.error('Error al enviar mensaje al backend:', error);
        }
    }

    setBotMessage = message => {
        this.setState(prevState => ({
            ...prevState,
            messages: [...prevState.messages, this.createChatBotMessage(message)]
        }));
    };
}

export default ActionProvider;

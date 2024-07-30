import axios from '@/lib/axios';
import { createClientMessage } from 'react-chatbot-kit';

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, config, stateRef) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.config = config;
        this.stateRef = stateRef;
        this.talkId = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('talk_id')) : null;
        this.intentId = JSON.parse(localStorage.getItem('intent_id')) ?? 'false';
    }

    handleOptionClick = (optionValue) => {
        console.log('Opción seleccionada:', optionValue);
        const message = this.createChatBotMessage(`Has seleccionado: ${optionValue}`);
        this.addMessageToState(message);
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
                const newErrorMessageBot = this.createChatBotMessage('Oops! Parece que ha habido un error, por favor intenta más tarde.');
                this.setBotMessage(newErrorMessageBot);
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

                const savedMessages = JSON.parse(localStorage.getItem('chat_messages')) || [];
                const newMessageUser = createClientMessage(message.message);
                savedMessages.push(newMessageUser);

                let newMessageBot;
                if (data.response?.intent?.options.length > 0) {
                    console.log('Intent options:', data.response.intent.options);

                    const options = data.response.intent.options.map((option) => ({
                        option: option.option,
                        id: option.id
                    }));

                    newMessageBot = this.createChatBotMessage(botResponse, {
                        widget: "widgetOptions",
                        payload: {
                            options: options
                        }
                    });
                } else {
                    newMessageBot = this.createChatBotMessage(botResponse);
                }

                this.addMessageToState(newMessageBot);

                savedMessages.push(newMessageBot);
                localStorage.setItem('chat_messages', JSON.stringify(savedMessages));

                if (typeof data.response === 'object' && data.response?.intent) {
                    this.intentId = data.response.intent.id;
                    localStorage.setItem('intent_id', JSON.stringify(this.intentId));
                }
            }
        } catch (error) {
            const newErrorMessageBot = this.createChatBotMessage('Oops! Parece que ha habido un error al enviar el mensaje, por favor intenta más tarde.');
            this.setBotMessage(newErrorMessageBot);
            console.error('Error al enviar mensaje al backend:', error);
        }
    }

    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;


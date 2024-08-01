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

    async handleTalk() {
        if (!this.talkId) {
            try {
                const { data } = await axios.post(`/api/chatbot/${this.stateRef.chatbotId}/talk`, {});
                if (data) {
                    this.talkId = data.talkId;
                    localStorage.setItem('talk_id', JSON.stringify(this.talkId));
                }
            } catch (error) {
                const newErrorMessageBot = this.createChatBotMessage('Oops! Parece que ha habido un error, por favor intenta más tarde.');
                this.addMessageToState(newErrorMessageBot);
                console.error('Error al crear la conversación:', error);
                return;
            }
        }
    }

    handleMessage(message) {
        this.handleSendMessage(message.message, false);
    }

    handleOption(option) {
        this.handleSendMessage(option.option, true, option.id);
        const message = this.createClientMessage(`${option.option}`);
        this.addMessageToState(message);
    }

    async handleSendMessage(message, type, id) {
        await this.handleTalk();
        try {
            const { data } = await axios.post(`/api/chatbot/${this.stateRef.chatbotId}/talk/${this.talkId}/message/${this.intentId}`, {
                message: message,
                is_option: type,
                id: id ?? null
            });

            if (data) {
                const botResponse = typeof data.response === 'object' && data.response !== null
                    ? data.response.response
                    : data.response;

                const savedMessages = JSON.parse(localStorage.getItem('chat_messages')) || [];
                const newMessageUser = createClientMessage(message);
                savedMessages.push(newMessageUser);

                let newMessageBot = this.handleTypeMessage(data, botResponse);
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
            this.addMessageToState(newErrorMessageBot);
            console.error('Error al enviar mensaje al backend:', error);
        }
    }

    handleTypeMessage(data, botResponse) {
        if (data.response?.intent?.options.length > 0) {

            const options = data.response.intent.options.map((option) => ({
                option: option.option,
                id: option.id
            }));

            return this.createChatBotMessage(botResponse, {
                widget: "widgetOptions",
                payload: {
                    options: options
                }
            });
        } else {
            return this.createChatBotMessage(botResponse);
        }
    }

    addMessageToState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;


import axios from '@/lib/axios';
import { createClientMessage } from 'react-chatbot-kit';

class ActionProvider {
    createChatBotMessage = null;
    setState = null;
    config = null;
    stateRef = null;
    chatbotId = null;
    talkId = null;
    intentId = null;
    transcript = '';

    constructor(createChatBotMessage, setStateFunc, config, stateRef) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.config = config;
        this.stateRef = stateRef;
        this.chatbotId = JSON.parse(localStorage.getItem('chatbot_id'));
        this.talkId = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('talk_id')) : null;
        this.intentId = JSON.parse(localStorage.getItem('intent_id')) ?? 'false';
    }

    async handleTalk() {
        if (!this.talkId) {
            try {
                this.chatbotId = this.stateRef.chatbotId
                const { data } = await axios.post(`/api/chatbot/${this.chatbotId}/talk`, {});
                if (data) {
                    this.talkId = data.talkId;
                    localStorage.setItem('talk_id', JSON.stringify(this.talkId));
                    localStorage.setItem('chatbot_id', JSON.stringify(this.chatbotId));
                }
            } catch (error) {
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
        const message = createClientMessage(`${option.option}`);
        this.addMessageToState(message);
    }

    async handleSendMessage(message, type, id) {
        await this.handleTalk();
        try {
            const { data } = await axios.post(`/api/chatbot/${this.chatbotId}/talk/${this.talkId}/message/${this.intentId}`, {
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


        // Bind all methods
        // Object.getOwnPropertyNames(ActionProvider.prototype).forEach((method) => {
        //     if (typeof this[method] === 'function') {
        //         this[method] = this[method].bind(this);
        //     }
        // });

        // setTimeout(this.addButtonListener, 1000);
    // }

    // addButtonListener() {
    //     const button = document.getElementById('my-button');
    //     if (button) {
    //         button.addEventListener('click', this.handleButtonClick);
    //     } else {
    //         console.error('Botón no encontrado');
    //     }
    // }

    // handleButtonClick() {
    //     console.log('El botón fue clickeado');

    //     if (!('webkitSpeechRecognition' in window)) {
    //         console.error('El reconocimiento de voz no es compatible con este navegador.');
    //         return;
    //     }

    //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //     const recognition = new SpeechRecognition();

    //     recognition.lang = 'es-ES';
    //     recognition.interimResults = false;
    //     recognition.maxAlternatives = 1;

    //     recognition.onstart = () => {
    //         console.log('Voice recognition started. Speak into the microphone.');
    //     };

    //     recognition.onresult = (event) => {
    //         this.transcript = event.results[0][0].transcript;
    //         console.log('Transcript:', this.transcript);

    //         const message = createClientMessage(this.transcript);

    //         this.setState((prevState) => ({
    //             ...prevState,
    //             messages: [...prevState.messages, message],
    //         }));

    //         this.handleMessage({ message: message });
    //     };

    //     recognition.onerror = (event) => {
    //         console.error('Error occurred in recognition: ', event.error);
    //     };

    //     recognition.start();
    // }

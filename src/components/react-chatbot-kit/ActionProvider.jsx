import axios from '@/lib/axios';
import { createClientMessage } from 'react-chatbot-kit';

class ActionProvider {
    constructor(createChatBotMessage, setState, config, stateRef) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setState;
        this.config = config;
        this.stateRef = stateRef;
        this.talkId = JSON.parse(localStorage.getItem('talk_id'));
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
            const { data } = await axios.post(`/api/chatbot/${this.stateRef.chatbotId}/talk/${this.talkId}/message`, message);

            if (data) {
                const botResponse = data.response;
                this.setBotMessage(botResponse);

                const savedMessages = JSON.parse(localStorage.getItem('chat_messages')) || [];
                const newMessageUser = createClientMessage(message.message);
                savedMessages.push(newMessageUser);
                localStorage.setItem('chat_messages', JSON.stringify(savedMessages));

                const newMessageBot = this.createChatBotMessage(botResponse);
                savedMessages.push(newMessageBot);
                localStorage.setItem('chat_messages', JSON.stringify(savedMessages));
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

// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//     const handleHello = () => {
//         const botMessage = createChatBotMessage('Hello. Nice to meet you.');

//         setState((prev) => ({
//             ...prev,
//             messages: [...prev.messages, botMessage],
//         }));
//     };

//     const handleWidgetCustome = () => {
//         const botMessage = createChatBotMessage(
//             "Here's a nice dog picture for you!",
//             {
//                 widget: 'widgetCustome',
//             }
//         );

//         setState((prev) => ({
//             ...prev,
//             messages: [...prev.messages, botMessage],
//         }));
//     };

//     // Put the handleHello function in the actions object to pass to the MessageParser
//     return (
//         <div>
//             {React.Children.map(children, (child) => {
//                 return React.cloneElement(child, {
//                     actions: {
//                         handleHello,
//                         handleWidgetCustome
//                     },
//                 });
//             })}
//         </div>
//     );
// };

// export default ActionProvider;

import axios from 'axios';

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, config) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.config = config;
    }

    async handleMessage({ message }) {
        // Enviar mensaje al backend usando Axios
        try {
            const response = await axios.post(`api/v1/chatbot/${chatbotId}/talk/${talkId}/send-message`, {
                message: message,
            });

            const botResponse = response.data; // Suponiendo que el backend devuelve un campo 'message'

            // Actualizar el estado del chatbot con la respuesta del backend
            this.setBotMessage(botResponse);
        } catch (error) {
            console.error('Error al enviar mensaje al backend:', error);
        }
    }

    setBotMessage = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, this.createChatBotMessage(message)],
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


import { createChatBotMessage } from 'react-chatbot-kit';
// import WidgetCustome from '@/components/react-chatbot-kit/WidgetCustome.jsx';

const botName = 'YouBot';

const config = (chatbotId, botName, initialMessages) => ({
    botName: botName,
    placeHolderText: 'Escribe tu consulta',
    initialMessages: [createChatBotMessage(initialMessages)],
    customComponents: {
        header: () => <div className="bg-blue-500 text-white p-4">{botName}</div>
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: 'bg-blue-500'
        },
        chatButton: {
            backgroundColor: 'bg-blue-500'
        }
    },
    state: {
        chatbotId: chatbotId
    },
    // widgets: [
    //     {
    //         widgetName: 'widgetCustome',
    //         widgetFunc: props => <WidgetCustome {...props} />
    //     }
    // ]
});

export default config;

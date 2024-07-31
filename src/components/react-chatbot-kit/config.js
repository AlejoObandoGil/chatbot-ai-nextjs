import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import '@/styles/react-chatbot-kit.css';
import ChatbotHeader from './custom/ChatbotHeader';
import WidgetOptions from './widgets/WidgetOptions';

const config = (chatbotId, botName, initialMessages, onClearMessages) => ({
    botName: botName,
    placeHolderText: 'Escribe tu pregunta...',
    initialMessages: [
        createChatBotMessage(initialMessages)
    ],
    customComponents: {
        header: () => <ChatbotHeader botName={botName} onClearMessages={onClearMessages} />,
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: '#7986CB',
        },
        chatButton: {
            backgroundColor: '#5C6BC0',
        },
        userChatMessage: {
            className: 'break-words'
        }
    },
    state: {
        chatbotId: chatbotId,
        widgetOptions: []
    },
    widgets: [
        {
            widgetName: 'widgetOptions',
            widgetFunc: (props) => {
                return <WidgetOptions {...props} />;
            },
            mapStateToProps: ['widgetOptions']
        },
    ],
});

export default config;

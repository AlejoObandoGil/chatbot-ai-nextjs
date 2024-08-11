import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import '@/styles/react-chatbot-kit.css';
import ChatbotHeader from './custom/ChatbotHeader';
import WidgetOptions from './widgets/WidgetOptions';
import BotAvatar from "./custom/BotAvatar";
import UserAvatar from "./custom/UserAvatar";

const config = (chatbotId, botName, initialMessages, initialOptions, onClearMessages, onChangePersonalization) => ({
    botName: botName,
    placeHolderText: 'Escribe tu pregunta...',
    initialMessages: [
        createChatBotMessage(initialMessages, {
            widget: 'widgetOptions',
            payload: {
                options: initialOptions
            },
        })
    ],
    customComponents: {
        header: () => <ChatbotHeader
            botName={botName}
            onClearMessages={onClearMessages}
            onChangePersonalization={onChangePersonalization}
        />,
        botAvatar: (props) => <BotAvatar {...props} />,
        userAvatar: (props) => <UserAvatar onChangePersonalization={onChangePersonalization} />
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: onChangePersonalization[0] || '#7986CB',
        },
        chatButton: {
            backgroundColor: onChangePersonalization[1] || '#5C6BC0',
        },
        userChatMessage: {
            className: 'break-words'
        },
        userChatAvatar: {
            backgroundColor: onChangePersonalization[0] || '#7986CB',
        }
    },
    state: {
        chatbotId: chatbotId,
        widgetOptions: [],
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

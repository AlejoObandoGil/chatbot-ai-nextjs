// in config.js
import { createChatBotMessage } from 'react-chatbot-kit'
import WidgetCustome from '@/components/react-chatbot-kit/WidgetCustome.jsx'

const botName = 'ExcitementBot'

const config = {
    initialMessages: [
        createChatBotMessage(`Hi! I'm ${botName}`)
    ],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        },
    },
    widgets: [
        {
            widgetName: 'widgetCustome',
            widgetFunc: props => <WidgetCustome {...props} />,
        },
    ],
}

export default config

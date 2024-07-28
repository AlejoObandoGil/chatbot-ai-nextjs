// import React, { useState, useEffect } from 'react';
// import Chatbot from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import axios from '@/lib/axios';
// import config from '@/components/react-chatbot-kit/config.js';
// import MessageParser from '@/components/react-chatbot-kit/MessageParser.jsx';
// import ActionProvider from '@/components/react-chatbot-kit/ActionProvider.jsx';

// const ChatbotCrm = ({ chatbotId, talkId, toggleChatBot }) => {
//     const [talk, setTalk] = useState([]);
//     const [botName, setBotName] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const fetchTalk = async () => {
//             try {
//                 const {data } = await axios.get(`/api/v1/chatbot/${chatbotId}/talk/${talkId}`);
//                 setTalk(data.talk);
//                 setBotName(data.chatbot.name);
//                 setMessages(data.talk.messages);
//             } catch (error) {
//                 console.error('Error fetching Talk:', error);
//             }
//         };

//         fetchTalk();
//     }, []);

//     const loadMessages = () => {
//         return messages || [];
//     };

//     const clearMessages = () => {
//         toggleChatBot(false);
//     }

//     return (
//         <>
//             { talk  && messages &&
//                 <div className="fixed bottom-4 right-8 z-50">
//                     <div className="fixed bottom-20 right-8 bg-white shadow-lg rounded-lg overflow-hidden">
//                         <Chatbot
//                             config={config(chatbotId, botName, null, clearMessages)}
//                             messageParser={MessageParser}
//                             actionProvider={ActionProvider}
//                             headerText="Chatbot"
//                             placeholderText="Escribe tu consulta..."
//                             messageHistory={messages}
//                         />
//                     </div>
//                 </div>
//             }
//         </>
//     );
// };

// export default ChatbotCrm;

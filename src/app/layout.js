'use client';

import { Nunito } from 'next/font/google';
import '@/styles/tailwind.css';
import ChatbotTutorial from '@/components/react-chatbot-kit/ChatbotTutorial';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap'
});

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">{children}
                <ChatbotTutorial chatbotId="65b941fb-2d44-476b-9939-fa5723505f2d" />

            </body>
        </html>
    );
};

// export const metadata = {
//     title: 'Chatbot'
// };

export default RootLayout;

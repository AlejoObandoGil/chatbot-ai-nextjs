import { Nunito } from 'next/font/google';
import '@/styles/tailwind.css';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap'
});

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">{children}</body>
        </html>
    );
};

export const metadata = {
    title: 'Chatbot'
};

export default RootLayout;

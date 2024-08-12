'use client';

import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import React from 'react';
import {
    Typography,
} from '@material-tailwind/react';

const Dashboard = () => {

    // const [text, setText] = useState('');

//   const startRecognition = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.onstart = () => {
//       console.log('Voice recognition started. Speak into the microphone.');
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setText(transcript);
//       console.log('Transcript:', transcript);
//     };

//     recognition.onerror = (event) => {
//       console.error('Error occurred in recognition: ', event.error);
//     };

//     recognition.start();
//   };

    return (
        <>
            {/* <button onClick={startRecognition}>Start Voice Recognition</button>
            <p>Text: {text}</p> */}
            <Typography variant="h5" color="indigo" className="text-center mb-3">
                Inicio - Uso de Chatbots
            </Typography>

            <LineChart />
            <BarChart />
        </>
    );
};

export default Dashboard;

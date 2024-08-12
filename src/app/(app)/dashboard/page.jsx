'use client';

import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import React from 'react';
import {
    Typography,
} from '@material-tailwind/react';

const Dashboard = () => {
    return (
        <>
            <Typography variant="h5" color="indigo" className="text-center mb-3">
                Inicio - Uso de Chatbots
            </Typography>

            <LineChart />
            <BarChart />
        </>
    );
};

export default Dashboard;

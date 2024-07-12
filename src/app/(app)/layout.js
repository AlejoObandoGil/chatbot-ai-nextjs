'use client'

import React from 'react';
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Navigation from '@/app/(app)/Navigation';
import Loading from '@/app/(app)/Loading';
import Sidebar from '@/app/(app)/Sidebar';

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className="flex-1">
                <Navigation user={user} />
                {/* Contenido principal */}
                {/* <main className={`p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}> */}
                <main className={`p-4 transition-all duration-300 ml-80`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;



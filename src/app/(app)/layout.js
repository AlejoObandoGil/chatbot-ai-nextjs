'use client'

import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Navigation from '@/app/(app)/Navigation';
import Loading from '@/app/(app)/Loading';
import Sidebar from '@/app/(app)/Sidebar';

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' });

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />

            <div className="min-h-screen">
                <Navigation user={user} />
                {/* Contenido principal */}
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;

import React from 'react';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { FaAdjust , FaEye } from 'react-icons/fa';
import { TiFlowMerge } from 'react-icons/ti';
import { TbMessageChatbot } from "react-icons/tb";

const NavbarEditChatbot = ({ selectedTab, setSelectedTab }) => {
    const data = [
        {
            label: 'Información del Bot',
            value: 'informacion',
            icon: TbMessageChatbot,
        },
        {
            label: 'Personalización',
            value: 'personalizacion',
            icon: FaAdjust,
        },
        {
            label: 'Editor de Flujo',
            value: 'editor_de_flujo',
            icon: TiFlowMerge ,
        },
        {
            label: 'Vista Previa',
            value: 'vista_previa',
            icon: FaEye,
        }
    ];

    return (
        <div className="flex justify-center">
            <Tabs value={selectedTab} className="w-full max-w-5xl">
                <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                        <Tab key={value} value={value} onClick={() => setSelectedTab(value)}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-300 rounded-md
                            ${selectedTab === value
                                ? 'text-indigo-600 bg-gray-100'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                            <div className="flex items-center gap-2">
                                {React.createElement(icon, { className: 'w-5 h-5' })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
        </div>
    );
}

export default NavbarEditChatbot;

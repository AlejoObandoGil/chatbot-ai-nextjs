import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink';
import Dropdown from '@/components/Dropdown';
import { DropdownButton } from '@/components/DropdownLink';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '@/app/(app)/Sidebar.jsx';

const Navigation = ({ user }) => {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false); // Agrega setOpen para controlar el estado de 'open'

    // Llama a usePathname fuera del render condicional
    const currentPath = usePathname();

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Icono del menú para dispositivos móviles */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            {/* <FaBars className="h-6 w-6" /> */}
                        </button>
                    </div>

                    {/* Logo y enlaces de navegación */}
                    <div className="px-0 hidden sm:flex sm:items-center">
                        <Sidebar />

                        {/* Enlaces de navegación */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">{/* Agrega más enlaces de navegación según sea necesario */}</div>
                    </div>

                    {/* Dropdown de configuración */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }
                        >
                            <DropdownButton onClick={logout}>Logout</DropdownButton>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Menú de navegación responsive */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={currentPath === '/dashboard'} // Usa currentPath en lugar de llamar usePathname aquí
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {/* Agrega más enlaces de navegación responsive según sea necesario */}
                    </div>

                    {/* Opciones de configuración responsive */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">{user?.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Autenticación */}
                            <ResponsiveNavButton onClick={logout}>Logout</ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;

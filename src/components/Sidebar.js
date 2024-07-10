'use client'

import React from 'react'
import Link from 'next/link';

import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Input,
    Drawer,
    Card,
} from '@material-tailwind/react'

import {
    FaBars,
    FaHome,
    FaRobot,
    FaPlus,
    FaThList,
    FaUsers,
    FaWindowClose,
} from 'react-icons/fa'

import {
    PowerIcon,
} from '@heroicons/react/24/solid'
import {
    ChevronDownIcon,
} from '@heroicons/react/24/outline'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [open, setOpen] = React.useState(0)
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true)

    const handleOpen = value => {
        setOpen(open === value ? 0 : value)
    }

    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };

    const openDrawer = () =>{
        setIsDrawerOpen(true);
        setIsSidebarOpen(!isSidebarOpen);
    }
    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setIsSidebarOpen(isSidebarOpen);
    }
    return (
        <>
            <div className={`bg-dark-900 fixed top-0 left-0 h-full transition-width duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
                {/* <IconButton variant="text" size="sm" onClick={openDrawer}>
                    {isDrawerOpen ? (
                        <FaWindowClose className="h-8 w-8 stroke-2 right-4" />
                    ) : (
                        <FaBars className="h-8 w-8 stroke-2" />
                    )}
                </IconButton> */}
            <Drawer
                open={isDrawerOpen}
                // onClose={closeDrawer}
                className="bg-gray-900">
                <Card
                    color="bg-gray-900"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4 bg-gray-900 text-white">
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <img
                            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                            alt="brand"
                            className="h-8 w-8"
                        />
                        <Typography variant="h5" color="white">
                            YouBot
                        </Typography>
                    </div>
                    <List>
                        <Link href="/dashboard">
                            <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg">
                                <ListItemPrefix>
                                    <FaHome className="h-5 w-5 text-white mr-2" />
                                </ListItemPrefix>
                                <Typography
                                    color="white"
                                    className="mr-auto font-normal">
                                    Inicio
                                </Typography>
                            </ListItem>
                        </Link>

                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-white transition-transform ${open === 2 ? 'rotate-180' : ''
                                        }`}
                                />
                            }>
                            <ListItem
                                className="p-0 border-b-0 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg"
                                selected={open === 2}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <FaRobot className="h-5 w-5 text-white mr-2" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="white"
                                        className="mr-auto font-normal">
                                        Chatbots
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0 text-white">
                                    <Link href="/chatbots/create">
                                        <ListItem className='border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg'>
                                            <ListItemPrefix>
                                                <FaPlus strokeWidth={3} className="h-3 w-5 text-white mr-2" />
                                            </ListItemPrefix>
                                            Nuevo Chatbot
                                        </ListItem>
                                    </Link>
                                    <ListItem className='border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg'>
                                        <ListItemPrefix>
                                            <FaThList
                                                strokeWidth={3}
                                                className="h-3 w-5 text-white mr-2"
                                            />
                                        </ListItemPrefix>
                                        Lista de Chatbots
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg">
                            <ListItemPrefix>
                                <FaUsers className="h-5 w-5 text-white mr-2"/>
                            </ListItemPrefix>
                            <Typography
                                color="white"
                                className="mr-auto font-normal">
                                Clientes
                            </Typography>
                            <ListItemSuffix>
                                <Chip
                                    value="14"
                                    size="sm"
                                    variant="ghost"
                                    color="blue"
                                    className="rounded-full text-white ml-4"
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <hr className="my-2 border-gray-700" />

                        <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg">
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5 text-white mr-2" />
                            </ListItemPrefix>
                            <Typography
                                color="white"
                                className="mr-auto font-normal">
                                Cerrar sesión
                            </Typography>
                        </ListItem>
                    </List>
                </Card>
            </Drawer>
            </div>
        </>
    )
}

export default Sidebar;

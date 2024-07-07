'use client'

import React from 'react'
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
    FaWindowClose ,
} from 'react-icons/fa'

import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from '@heroicons/react/24/solid'
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
    const [open, setOpen] = React.useState(0)
    const [openAlert, setOpenAlert] = React.useState(true)
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true)

    const handleOpen = value => {
        setOpen(open === value ? 0 : value)
    }

    const openDrawer = () => setIsDrawerOpen(true)
    const closeDrawer = () => setIsDrawerOpen(false)

    return (
        <>
            <div className="fixed left-4 mb-5">
                <IconButton variant="text" size="lg" onClick={openDrawer}>
                    {isDrawerOpen ? (
                        <FaWindowClose className="h-8 w-8 stroke-2 right-4 text-white" />
                    ) : (
                        <FaBars className="h-8 w-8 stroke-2" />
                    )}
                </IconButton>
            </div>
            <Drawer
                open={isDrawerOpen}
                onClose={closeDrawer}
                className="dark">
                <Card
                    color="transparent"
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
                    {/* <div className="p-2">
                        <Input
                            icon={
                                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                            }
                            label="Search"
                            className="text-white"
                        />
                    </div> */}
                    <List>
                        <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                            <ListItemPrefix>
                                <FaHome className="h-5 w-5 text-white" />
                            </ListItemPrefix>
                            Inicio
                        </ListItem>
                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-white transition-transform ${
                                        open === 2 ? 'rotate-180' : ''
                                    }`}
                                />
                            }>
                            <ListItem
                                className="p-0 border-b-0 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                                selected={open === 2}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <FaRobot className="h-5 w-5 text-white" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="white"
                                        className="mr-auto font-normal">
                                        Automatizaciones
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0 text-white">
                                    <ListItem className='border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300'>
                                        <ListItemPrefix>
                                            <FaPlus
                                                strokeWidth={3}
                                                className="h-3 w-5 text-white"
                                            />
                                        </ListItemPrefix>
                                        Nuevo Chatbot
                                    </ListItem>
                                    <ListItem className='border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300'>
                                        <ListItemPrefix>
                                            <FaThList
                                                strokeWidth={3}
                                                className="h-3 w-5 text-white"
                                            />
                                        </ListItemPrefix>
                                        Lista de Chatbots
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                            <ListItemPrefix>
                                <FaUsers className="h-5 w-5 text-white" />
                            </ListItemPrefix>
                            Usuarios
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
                        {/* <ListItem className="text-white">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5 text-white" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem className="text-white">
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5 text-white" />
                            </ListItemPrefix>
                            Settings
                        </ListItem> */}
                        <ListItem className="border-b-0 p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5 text-white" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                    {/* <Alert
                        open={openAlert}
                        className="mt-auto bg-gray-800 text-white"
                        onClose={() => setOpenAlert(false)}>
                        <CubeTransparentIcon className="mb-4 h-12 w-12 text-white" />
                        <Typography variant="h6" className="mb-1 text-white">
                            Upgrade to PRO
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal opacity-80 text-white">
                            Upgrade to Material Tailwind PRO and get even more
                            components, plugins, advanced features and premium.
                        </Typography>
                        <div className="mt-4 flex gap-3">
                            <Typography
                                as="a"
                                href="#"
                                variant="small"
                                className="font-medium text-white"
                                onClick={() => setOpenAlert(false)}>
                                Dismiss
                            </Typography>
                            <Typography
                                as="a"
                                href="#"
                                variant="small"
                                className="font-medium text-white">
                                Upgrade Now
                            </Typography>
                        </div>
                    </Alert> */}
                </Card>
            </Drawer>
        </>
    )
}

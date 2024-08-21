import { useState, useEffect } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { motion } from 'framer-motion';

const VideoModal = ({ nameButton, titleModal, link }) => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setShowTooltip(true);
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center relative">
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
            >
                <Button
                    color="purple"
                    variant="gradient"
                    size="sm"
                    onClick={handleOpen}
                    ripple="light"
                    className="transform transition duration-300 ease-in-out"
                >
                    {nameButton}
                </Button>
            </motion.div>

            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bottom-14 bg-gray-700 text-white text-sm p-2 rounded-lg shadow-lg"
                >
                    Haz clic para ver el tutorial
                </motion.div>
            )}

            <Dialog open={open} handler={handleOpen} size="lg" animate={{ mount: { scale: 1, opacity: 1 }, unmount: { scale: 0.9, opacity: 0 } }}>
                <DialogBody>
                    <Typography variant="h4" color="indigo">{titleModal}</Typography>
                    <div className="mt-4">
                        <iframe
                            src={link}
                            width="100%"
                            height="480"
                            allow="autoplay"
                            allowFullScreen
                            frameBorder="0"
                        ></iframe>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={handleClose}
                        ripple="light"
                    >
                        Cerrar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default VideoModal;

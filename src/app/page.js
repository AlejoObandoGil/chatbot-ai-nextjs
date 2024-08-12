import Image from 'next/image';
import LoginLinks from '@/app/LoginLinks';

export const metadata = {
    title: 'Chatbot'
};

const Home = () => {
    return (
        <>
            <div className="relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <header className="relative z-10 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 py-8">
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src="/img/header.jpg"
                            alt="Background Header"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="opacity-50"
                        />
                    </div>
                    <div className="relative z-10 text-center text-white">
                        <LoginLinks />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Revoluciona tu Atención al Cliente con Nuestro Chatbot
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Experimenta la próxima generación en interacción con los usuarios con nuestra solución de chatbot avanzada y personalizable.
                        </p>
                        <a href="/login" className="bg-white text-indigo-600 py-2 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
                            Crear mi primer chatbot
                        </a>
                    </div>
                </header>

                <section className="bg-gray-50 dark:bg-gray-800 py-12 text-center">
                    <div className="container mx-auto">
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                            Adapta tu chatbot a medida que tu negocio crece, gestionando un alto volumen de interacciones sin perder rendimiento.
                        </p>
                        <Image
                            src="/img/chatbot.PNG"
                            alt="Chatbot Escalable"
                            layout="intrinsic"
                            width={200}
                            height={200}
                            className="object-contain mx-auto"
                        />
                    </div>
                </section>

                <main className="flex-1 py-12 px-6 md:px-12">
                    <section id="features" className="container mx-auto">
                        <h2 className="text-3xl font-bold text-indigo-500 dark:text-white text-center mb-12">
                            Características Destacadas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Panel de Administración Intuitivo
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Gestiona todos los aspectos de tu chatbot desde una interfaz sencilla y amigable, optimizando tu experiencia de usuario.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Personalización Total
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Personaliza tu chatbot según tus preferencias, ajustando el diseño, comportamiento y contenido para satisfacer tus necesidades.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Uso de IA Avanzada
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Mejora la comprensión y la interacción con los usuarios usando IA avanzada para una comunicación más natural y efectiva.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {/* Card 4 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Tres Tipos de Chatbots
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Ofrecemos tres tipos de chatbots para adaptarnos a diferentes necesidades y casos de uso, desde servicio al cliente hasta asistentes virtuales.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 5 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Integración Sencilla
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Añade nuestro chatbot a tu aplicación web con un simple script, asegurando una integración rápida y fácil.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 6 */}
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="p-6 flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-indigo-500 dark:text-white">
                                            Almacena en un CRM
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                                            Gestiona la información de tus clientes eficientemente con nuestro CRM integrado, manteniendo un registro detallado de las interacciones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-900 py-12 text-center text-white mt-6">
                        <div className="container mx-auto">
                            <h2 className="text-3xl font-bold mb-4">
                                ¿Listo para Transformar tu Atención al Cliente?
                            </h2>
                            <p className="text-lg mb-8">
                                Comienza hoy mismo y lleva tu negocio al siguiente nivel con nuestra solución de chatbot avanzada.
                            </p>
                            <a href="/login" className="bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold shadow-lg transition duration-300">
                                Contacta con Nosotros
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Home;


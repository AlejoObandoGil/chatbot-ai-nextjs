import React from 'react';
import { FaRobot, FaCogs, FaComments } from 'react-icons/fa';

const CardSelection = ({ onSelect }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-blue-100 transition duration-300 transform hover:-translate-y-1 hover:scale-105 min-h-[500px] flex flex-col justify-between"
                    onClick={() => onSelect('Reglas')}
                >
                    <div className="flex-grow">
                        <FaCogs className="text-blue-500 text-5xl mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Chatbot Basado en Reglas</h2>
                        <p className="text-gray-900 text-center text-lg">¡Tú defines las reglas de tu chatbot!</p>
                        <p className="text-gray-900 text-center mt-4">
                            Este tipo de chatbot sigue un conjunto de reglas predefinidas y secuencias de preguntas y respuestas. Es ideal para escenarios en
                            los que las interacciones son predecibles y no se requiere procesamiento de lenguaje natural.
                        </p>
                        <small className="text-gray-600 text-center block mt-4">Sin procesamiento de lenguaje natural ni modelos de machine learning.</small>
                    </div>
                </div>
                <div
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-green-100 transition duration-300 transform hover:-translate-y-1 hover:scale-105 min-h-[500px] flex flex-col justify-between"
                    onClick={() => onSelect('PLN')}
                >
                    <div className="flex-grow">
                        <FaRobot className="text-green-500 text-5xl mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold mb-4 text-center text-green-700">Chatbot con PLN</h2>
                        <p className="text-gray-900 text-center text-lg">¡Todo el poder de la IA en tu chatbot!</p>
                        <p className="text-gray-900 text-center mt-4">
                            Utiliza procesamiento de lenguaje natural (PLN) para entender y responder a las consultas de los usuarios. Ideal para escenarios
                            complejos donde las respuestas no pueden ser predefinidas y se requiere una interacción más natural y fluida.
                        </p>
                        <small className="text-gray-600 text-center block mt-4">Procesamiento de lenguaje natural con modelo GPT-4.</small>
                    </div>
                </div>
                <div
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm cursor-pointer hover:bg-purple-100 transition duration-300 transform hover:-translate-y-1 hover:scale-105 min-h-[500px] flex flex-col justify-between"
                    onClick={() => onSelect('Híbrido')}
                >
                    <div className="flex-grow">
                        <FaComments className="text-purple-500 text-5xl mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">Chatbot Híbrido</h2>
                        <p className="text-gray-900 text-center text-lg">¡Lo mejor de ambos mundos!</p>
                        <p className="text-gray-900 text-center mt-4">
                            Combina reglas predefinidas con procesamiento de lenguaje natural para ofrecer una experiencia flexible y adaptativa. Es perfecto
                            para empresas que necesitan manejar tanto interacciones predecibles como consultas más complejas que requieren comprensión
                            contextual.
                        </p>
                        <small className="text-gray-600 text-center block mt-4">
                            Usa PLN con modelode GPT-3.5 cuando es necesario para mayor flexibilidad.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSelection;

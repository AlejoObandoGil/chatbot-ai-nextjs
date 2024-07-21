import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaEllipsisV } from 'react-icons/fa';

function CustomeNode({ id, data, isConnectable, selected }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDeleteClick = () => {
        // eslint-disable-next-line no-unused-expressions
        console.log(`Eliminar nodo ${id}`);
    };

    return (
        <div
            className={`w-64 rounded-lg shadow-lg p-4 border ${
                selected ? 'border-indigo-500' : 'border-gray-300'
            } ${selected ? 'bg-indigo-50' : 'bg-white'} relative hover:bg-indigo-50`}
        >
            <div className="flex flex-col items-center mb-2">
                <small
                    className={`text-xs ${
                        id === 'node-1' ? 'text-gray-400' : 'text-gray-500'
                    } text-center`}
                >
                    {id === 'node-1' ? 'Mensaje de saludo' : '¿Cuál es tu siguiente enunciado?'}
                </small>
                <button
                    onClick={toggleDropdown}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    aria-label="Opciones"
                >
                    <FaEllipsisV />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-2 top-10 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                            onClick={handleDeleteClick}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                            Eliminar nodo
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center justify-center">
                <span className="text-sm font-semibold text-indigo-600">
                    {data.label || 'Nombre del nodo'}
                </span>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-blue-500 rounded-full"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-blue-500 rounded-full"
            />
        </div>
    );
}

export default CustomeNode;

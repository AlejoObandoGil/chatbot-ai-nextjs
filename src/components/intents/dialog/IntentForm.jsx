import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Button } from "@material-tailwind/react";
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const IntentForm = ({ node, onChange, onSave, onClose }) => {
    const [formData, setFormData] = useState(node);

    useEffect(() => {
        setFormData(node);
    }, [node]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        const updatedData = {
            ...formData,
            [name]: updatedValue,
            data: {
                ...formData.data,
                label: name === 'name' ? updatedValue : formData.data.label
            }
        };

        setFormData(updatedData);
        onChange(updatedData);
    };

    const handleArrayChange = (name, index, value) => {
        const updatedArray = [...formData[name]];
        updatedArray[index] = value;
        const updatedData = { ...formData, [name]: updatedArray };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const addArrayItem = (name) => {
        const updatedData = {
            ...formData,
            [name]: [...formData[name], '']
        };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const removeArrayItem = (name, index) => {
        const updatedArray = formData[name].filter((_, i) => i !== index);
        const updatedData = { ...formData, [name]: updatedArray };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Escribe un nombre identificador para esta intención. Por ejemplo: 'Saludos', 'Despedidas', 'Información'"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                color="indigo"
                variant="standard"
            />
            <Checkbox
                label="Es Tipo menú o seleccion multiple"
                name="is_choices"
                checked={formData.is_choices}
                onChange={handleInputChange}
                color="indigo"
            />
            <Checkbox
                label="Deseas guardar la respuesta del cliente?"
                name="save_information"
                checked={formData.save_information}
                onChange={handleInputChange}
                color="indigo"
            />
            <div>
                <label className="block text-sm font-medium text-gray-700">Frases</label>
                {formData.phrases.map((phrase, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                            value={phrase}
                            onChange={(e) => handleArrayChange('phrases', index, e.target.value)}
                            placeholder="Frase"
                            color="indigo"
                            variant="standard"
                        />
                        <button
                            type="button"
                            onClick={() => removeArrayItem('phrases', index)}
                            className="text-red-500"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('phrases')}
                    className="flex items-center text-blue-500"
                >
                    <PlusIcon className="w-5 h-5 mr-1" />
                    Añadir Frase
                </button>
            </div>
            {!formData.is_choices && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Respuestas</label>
                    {formData.responses.map((response, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Input
                                value={response}
                                onChange={(e) => handleArrayChange('responses', index, e.target.value)}
                                placeholder="Respuesta"
                                color="indigo"
                                variant="standard"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('responses', index)}
                                className="text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('responses')}
                        className="flex items-center text-blue-500"
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Añadir Respuesta
                    </button>
                </div>
            )}
            {formData.is_choices && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Opciones</label>
                    {formData.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Input
                                value={option}
                                onChange={(e) => handleArrayChange('options', index, e.target.value)}
                                placeholder="Opción"
                                color="indigo"
                                variant="standard"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('options', index)}
                                className="text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('options')}
                        className="flex items-center text-blue-500"
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Añadir Opción
                    </button>
                </div>
            )}
            <div className="flex justify-end space-x-2">
                <Button
                    variant='gradient'
                    className='me-2'
                    color="indigo"
                    onClick={onClose}
                >
                    Cerrar
                </Button>
                <Button
                    type="submit"
                    variant='gradient'
                    color="indigo"
                >
                    Guardar
                </Button>
            </div>
        </form>
    );
};

export default IntentForm;

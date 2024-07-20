import React, { useState, useEffect } from 'react';
import { Input, Checkbox } from "@material-tailwind/react";
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const IntentForm = ({ node, onChange }) => {
    const [formData, setFormData] = useState(node)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        onChange && onChange({ ...formData, [name]: value });
    };

    const handleArrayChange = (name, index, value) => {
        const updatedArray = [...formData[name]];
        updatedArray[index] = value;
        setFormData(prevState => ({ ...prevState, [name]: updatedArray }));
        onChange && onChange({ ...formData, [name]: updatedArray });
    };

    const addArrayItem = (name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: [...prevState[name], '']
        }));
    };

    const removeArrayItem = (name, index) => {
        const updatedArray = formData[name].filter((_, i) => i !== index);
        setFormData(prevState => ({ ...prevState, [name]: updatedArray }));
        onChange && onChange({ ...formData, [name]: updatedArray });
    };

    return (
        <div className="space-y-4">
            <Input
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                color="indigo"
                variant="standard"
            />
            <Input
                type="number"
                label="Nivel"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                color="indigo"
                variant="standard"
            />
            <Input
                type="number"
                label="ID de Categoría de Intención"
                name="intent_category_id"
                value={formData.intent_category_id}
                onChange={handleInputChange}
                required
                color="indigo"
                variant="standard"
            />
            <Checkbox
                label="Es Elección"
                name="is_choices"
                checked={formData.is_choices}
                onChange={(e) => handleInputChange({ target: { name: 'is_choices', value: e.target.checked } })}
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
        </div>
    );
};

export default IntentForm;

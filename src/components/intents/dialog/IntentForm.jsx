import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Button, Alert, Select, Option } from "@material-tailwind/react";
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from '@/lib/axios';
import { formatErrorMessage } from '@/utils/alertUtils.js';

const IntentForm = ({ chatbotId, node, typeInformationRequired, onChange, onSave, onClose }) => {
    const [formData, setFormData] = useState(node);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [loadingSave, setloadingSave] = useState(false);

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

    const handleArrayChange = (name, index, key, value) => {
        const updatedArray = formData[name].map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        const updatedData = { ...formData, [name]: updatedArray };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const addArrayItem = (name) => {
        const newItem = name === 'training_phrases' ? { phrase: '' }
            : name === 'responses' ? { response: '' }
            : { option: '' };

        const updatedData = {
            ...formData,
            [name]: [...formData[name], newItem]
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloadingSave(true);

        try {
            let response = await axios.post(`/api/v1/chatbot/${chatbotId}/intent`, formData);

            if (response.status === 200 || response.status === 201) {
                setAlertMessage(response.data.message);
                setAlertColor('green');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    onSave();
                }, 5000);
            } else {
                handleErrorResponse(response);
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
            handleErrorResponse(error.response);
        } finally {
            setloadingSave(false);
        }
    };

    const handleErrorResponse = (response) => {
        const alertMessage = formatErrorMessage(response);
        setAlertMessage(alertMessage);
        setAlertColor('red');
        setShowAlert(true);
    };

    return (
        <div>
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
                    name="is_choice"
                    checked={formData.is_choice}
                    onChange={handleInputChange}
                    color="indigo"
                />
                <Checkbox
                    label="¿Deseas guardar la respuesta del usuario?"
                    name="save_information"
                    checked={formData.save_information}
                    onChange={handleInputChange}
                    color="indigo"
                />
                {formData.save_information && (
                    <div>
                        <Select
                            label="Selecciona el tipo de información requerida"
                            value={formData.information_required || ''}
                            onChange={(value) => handleInputChange({ target: { name: 'information_required', value } })}
                        >
                            {typeInformationRequired.map((type) => (
                                <Option key={type} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </div>
                )}
                {!formData.save_information && (
                    <div>
                        <label className="block text-sm font-medium text-indigo-500 mb-2">Frases</label>
                        {formData.training_phrases.map((training_phrase, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <Input
                                    label="Frase de entrenamiento (Es lo que es esperas que escriba o pregunte el usuario)"
                                    value={training_phrase.phrase}
                                    onChange={(e) => handleArrayChange('training_phrases', index, 'phrase', e.target.value)}
                                    placeholder="Frase"
                                    color="indigo"
                                    variant="standard"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('training_phrases', index)}
                                    className="text-red-500"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('training_phrases')}
                            className="flex items-center text-blue-500"
                        >
                            <PlusIcon className="w-5 h-5 mr-1" />
                            Añadir Frase
                        </button>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-indigo-500 mb-2">Respuestas</label>
                    {formData.responses.map((response, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Input
                                label="Respuesta (Es lo que es esperas que responda tu chatbot a el usuario)"
                                value={response.response}
                                onChange={(e) => handleArrayChange('responses', index, 'response', e.target.value)}
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
                {formData.is_choice && (
                    <div>
                        <label className="block text-sm font-medium text-indigo-500 mb-2">Opciones</label>
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <Input
                                    label="Opción (Dale a tu usuario una opción que puede escoger)"
                                    value={option.option}
                                    onChange={(e) => handleArrayChange('options', index, 'option', e.target.value)}
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
                        size="md"
                        loading={loadingSave}
                    >
                        Guardar
                    </Button>
                </div>
            </form>
            <div className="mt-4">
                {showAlert && (
                    <Alert
                        color={alertColor}
                        onClose={() => setShowAlert(false)}
                    >
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default IntentForm;

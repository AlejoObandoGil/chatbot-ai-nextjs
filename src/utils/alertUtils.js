export const formatErrorMessage = (response) => {
    let alertMessage = 'Error al guardar la intención.';

    if (response && response.data) {
        if (response.data.message) {
            alertMessage = response.data.message;
        }

        if (response.data.errors) {
            const errorMessages = Object.keys(response.data.errors).map(key => {
                return response.data.errors[key].join(', ');
            });

            alertMessage = `
                ${alertMessage}\n
                Detalles del error:\n
                ${errorMessages.join('\n')}
            `;
        }
    }

    return alertMessage;
};

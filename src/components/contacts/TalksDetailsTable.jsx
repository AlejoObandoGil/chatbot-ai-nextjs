import React from 'react';
import { Card, Typography } from '@material-tailwind/react';

const TalksDetailsTable = ({ contactInformation }) => {
    return (
        <>
            <Typography variant="h6" color="indigo" className='text-center'>Lista de de detalles de contacto</Typography>
            <Card className="h-full w-full overflow-scroll mt-4">
                <table className="mt-2 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Intención del cliente
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Información pedida al cliente
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Información recibida del cliente
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactInformation.map((contact) => (
                            <tr key={contact.id}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.intent.name}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.intent.information_required}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contact.value}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </>
    );
};

export default TalksDetailsTable;

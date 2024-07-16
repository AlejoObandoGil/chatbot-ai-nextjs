// new file called WidgetCustome.jsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const WidgetCustome = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(data => {
                setImageUrl(data.message);
            });
    }, []);

    return (
        <div>
            <Image
                src={imageUrl}
                width={400}
                height={400}
            />
        </div>
    );
};

export default WidgetCustome;

import { useState, useEffect } from 'react';

export const useScreenWidth = () => {
    const [width, setWidth] = useState(2000);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};
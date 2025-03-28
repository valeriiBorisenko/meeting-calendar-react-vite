import { useEffect, useState } from 'react';
import { RootWidthContext } from '../context';


export const RootWidthProvider = ({ children }) => {
    const [width, setWidth] = useState(null);

    useEffect(() => {
        const root = document.getElementById('root');
        if (!root) return;
  
        const updateWidth = () => {
            setWidth(root.offsetWidth);
        };
  
        updateWidth(); // начальное значение
  
        const observer = new ResizeObserver(updateWidth);
        observer.observe(root);
  
        return () => observer.disconnect();
    }, []);

    return (
        <RootWidthContext.Provider value={width}>
            {children}
        </RootWidthContext.Provider>
    );
};
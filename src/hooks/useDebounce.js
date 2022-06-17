import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [deboucevalue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return deboucevalue;
}

export default useDebounce;

import { useState, useCallback } from 'react';

function useHTMLNode() {
    const [node, setNode] = useState(null);
    const setReference = useCallback(htmlNode => {
        if (htmlNode !== null) {
            setNode(htmlNode);
        }
    }, []);
    return [node, setReference];
}

export default useHTMLNode;

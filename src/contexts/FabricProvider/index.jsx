import React, { useMemo } from 'react';
import { fabric } from 'fabric';

export const FabricContext = React.createContext({
    fabric: {},
    toJSON: () => {},
    createCanvas: () => {},
    createStaticCanvas: () => {},
    loadFromJSON: () => {},
});

function FabricProvider({ children }) {
    const state = useMemo(
        () => ({
            fabric,
            toJSON: canvas => canvas.toJSON(),
            createCanvas: reference => new fabric.Canvas(reference),
            createStaticCanvas: reference => new fabric.StaticCanvas(reference),
            loadFromJSON: (canvas, jsonData) => canvas.loadFromJSON(jsonData, canvas.renderAll.bind(canvas)),
        }),
        [],
    );

    return <FabricContext.Provider value={state}>{children}</FabricContext.Provider>;
}

export default FabricProvider;

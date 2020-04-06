import { fabric } from 'fabric';
import React, { useCallback, useMemo, useState } from 'react';

export const FabricContext = React.createContext({
    fabricCanvas: null,
    filterStrength: 0,
    canChangeStrength: false,
    setFilterStrength: () => {},
    createCanvas: () => {},
    toFile: () => {},
    setBackgroundImage: () => {},
    clear: () => {},
    availableEffects: [],
});

function FabricProvider({ children }) {
    const [fabricCanvas, setFabricCanvas] = useState(null);
    const [filterStrength, setFilterStrength] = useState(0);
    const [canChangeStrength, setCanChangeStrength] = useState(false);

    const createCanvas = useCallback(
        reference => {
            if (!fabricCanvas) {
                setFabricCanvas(new fabric.Canvas(reference));
            }
        },
        [fabricCanvas],
    );

    const toFile = useCallback(
        () =>
            fabricCanvas.toDataURL({
                format: 'jpeg',
                quality: 0.92,
            }),
        [fabricCanvas],
    );

    const getImageDimensions = useCallback(file => {
        return new Promise(resolved => {
            const image = new Image();
            image.onload = () => {
                resolved({ width: image.width, height: image.height });
            };
            image.src = file;
        });
    }, []);

    const setBackgroundImage = useCallback(
        async image => {
            const imageUrl = window.URL.createObjectURL(image);
            const { width, height } = await getImageDimensions(imageUrl);
            const browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            fabricCanvas.setWidth(width > browserWidth - 10 ? browserWidth - 10 : width);
            fabricCanvas.setHeight(height > browserHeight - 300 ? browserHeight - 300 : height);
            fabric.Image.fromURL(imageUrl, renderedImage => {
                fabricCanvas.backgroundColor = '#d1d1e9';
                fabricCanvas.add(renderedImage);
                fabricCanvas.centerObject(renderedImage);
                fabricCanvas.renderAll();
            });
        },
        [fabricCanvas, getImageDimensions],
    );

    const addEffect = useCallback(
        (effectName, filterStrengthObject = null) => {
            const [fabricImageObject] = fabricCanvas.getObjects();
            fabric.Image.fromURL(fabricImageObject.getSrc(), renderedImage => {
                const filter = new fabric.Image.filters[effectName](filterStrengthObject);
                renderedImage.filters.push(filter);
                renderedImage.applyFilters();
                fabricCanvas.add(renderedImage);
                fabricCanvas.centerObject(renderedImage);
                fabricCanvas.renderAll();
                fabricCanvas.remove(fabricImageObject);
            });
        },
        [fabricCanvas],
    );

    const addGrayscale = useCallback(() => {
        setCanChangeStrength(false);
        addEffect('Grayscale');
    }, [addEffect]);

    const addSepia = useCallback(() => {
        setCanChangeStrength(false);
        addEffect('Sepia');
    }, [addEffect]);

    const addVintage = useCallback(() => {
        setCanChangeStrength(false);
        addEffect('Vintage');
    }, [addEffect]);

    const addSaturation = useCallback(() => {
        setCanChangeStrength(true);
        addEffect('Saturation', { saturation: filterStrength });
    }, [addEffect, filterStrength]);

    const addBlur = useCallback(() => {
        setCanChangeStrength(true);
        addEffect('Blur', { blur: filterStrength / 100 });
    }, [addEffect, filterStrength]);

    const availableEffects = useMemo(
        () => [
            { label: 'Sepia', applyEffect: addSepia },
            { label: 'Grayscale', applyEffect: addGrayscale },
            { label: 'Vintage', applyEffect: addVintage },
            { label: 'Saturation', applyEffect: addSaturation },
            { label: 'Blur', applyEffect: addBlur },
        ],
        [addBlur, addGrayscale, addSaturation, addSepia, addVintage],
    );
    const state = useMemo(
        () => ({
            fabricCanvas,
            createCanvas,
            toFile,
            setBackgroundImage,
            clear: () => setFabricCanvas(null),
            filterStrength,
            setFilterStrength,
            canChangeStrength,
            availableEffects,
        }),
        [createCanvas, fabricCanvas, setBackgroundImage, toFile, filterStrength, setFilterStrength, canChangeStrength, availableEffects],
    );

    return <FabricContext.Provider value={state}>{children}</FabricContext.Provider>;
}

export default FabricProvider;

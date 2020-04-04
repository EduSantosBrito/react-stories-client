import React, { useContext, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { FabricContext } from '../../contexts/FabricProvider';

function Canva() {
    const { fabric, createStaticCanvas, createCanvas, loadFromJSON, toJSON } = useContext(FabricContext);
    const canvasRef = useRef();
    const fabricCanvasRef = useRef();
    const fabricStaticCanvasRef = useRef();
    const webcamRef = useRef();

    useEffect(() => {
        if (canvasRef.current && fabric) {
            fabricCanvasRef.current = createCanvas(canvasRef.current);
            const rect = new fabric.Rect({
                top: 100,
                left: 100,
                width: 60,
                height: 70,
                fill: 'red',
            });
            const rect2 = new fabric.Rect({
                top: 50,
                left: 50,
                width: 60,
                height: 70,
                fill: 'red',
            });
            fabricCanvasRef.current.add(rect);
            fabricCanvasRef.current.add(rect2);
        }
    }, [canvasRef, createCanvas, fabric]);

    return (
        <div>
            <div style={{ width: '100%', height: 500, display: 'flex', placeItems: 'center' }}>
                <canvas
                    width='500'
                    height='500'
                    ref={canvas => {
                        canvasRef.current = canvas;
                    }}
                />
            </div>
            <Webcam
                audio={false}
                ref={webcam => {
                    webcamRef.current = webcam;
                }}
            />
            <button
                type='button'
                onClick={() => {
                    const screenshot = webcamRef.current.getScreenshot();
                    fabricStaticCanvasRef.current = createStaticCanvas(canvasRef.current);
                    loadFromJSON(fabricStaticCanvasRef.current, toJSON(fabricCanvasRef.current));
                    fabricStaticCanvasRef.current.setBackgroundImage(
                        screenshot,
                        fabricStaticCanvasRef.current.renderAll.bind(fabricStaticCanvasRef.current),
                        {
                            originX: 'left',
                            originY: 'top',
                        },
                    );
                    fabricCanvasRef.current.clear();
                }}
            >
                Tirar foto
            </button>
        </div>
    );
}

export default Canva;

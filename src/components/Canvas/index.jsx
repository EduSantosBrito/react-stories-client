import React, { useContext, useEffect, useRef, useState } from 'react';
import { FabricContext } from '../../contexts/FabricProvider';
import { AbsoluteContainer } from '../../shared';
import { StyledCanvas, StyledWebcam } from './styled';

function Canvas() {
    const [canvasWidth, setCanvasWidth] = useState(null);
    const [canvasHeight, setCanvasHeight] = useState(null);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const { createCanvas } = useContext(FabricContext);

    useEffect(() => {
        if (webcamRef.current) {
            // Getting 18:9 aspect ratio width to overlap video tag
            setCanvasHeight(webcamRef.current.video.offsetHeight);
            setCanvasWidth((webcamRef.current.video.offsetHeight * 9) / 18);
            fabricCanvasRef.current = createCanvas(canvasRef.current);
        }
    }, [canvasWidth, createCanvas]);

    return (
        <>
            <AbsoluteContainer height='100%'>
                <StyledWebcam
                    audio={false}
                    ref={webcamRef}
                    videoConstraints={{
                        aspectRatio: 0.5,
                        facingMode: 'user',
                    }}
                />
            </AbsoluteContainer>
            {canvasWidth && canvasHeight && (
                <AbsoluteContainer width={`${canvasWidth}px`} height={`${canvasHeight}px`}>
                    <StyledCanvas width={canvasWidth} height={`${canvasHeight}px`} ref={canvasRef} />
                </AbsoluteContainer>
            )}
        </>
    );
}

export default Canvas;

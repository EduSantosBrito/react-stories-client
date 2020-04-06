import React, { useContext, useEffect, useState } from 'react';
import { FabricContext } from '../../contexts/FabricProvider';
import { FileContext } from '../../contexts/FileProvider';
import useHTMLNode from '../../hooks/useHTMLNode';
import { Button, FlexContainer } from '../../shared';
import { ButtonContainer, RangeContainer, RangeCount, RangeInput, RangeButton, SelectContainer, SelectInput } from './styled';

function Canvas() {
    const {
        fabricCanvas,
        createCanvas,
        setBackgroundImage,
        clear,
        toFile,
        setFilterStrength,
        filterStrength,
        canChangeStrength,
        availableEffects,
    } = useContext(FabricContext);
    const { file, deleteFileFromMemory, downloadFile } = useContext(FileContext);
    const [node, setReference] = useHTMLNode();

    const [selectedEffect, setSelectedEffect] = useState('default');

    useEffect(() => {
        if (!fabricCanvas && node) {
            createCanvas(node);
        }
    }, [createCanvas, fabricCanvas, node]);

    useEffect(() => {
        if (file && fabricCanvas) {
            setBackgroundImage(file);
        }
    }, [file, fabricCanvas, setBackgroundImage]);

    return (
        <FlexContainer width='100%' height='100%' flexDirection='column'>
            <canvas ref={setReference} />
            {canChangeStrength && (
                <RangeContainer flexDirection='column'>
                    <RangeCount>{filterStrength}%</RangeCount>
                    <RangeInput
                        type='range'
                        min='0'
                        max='100'
                        value={String(filterStrength)}
                        onChange={event => {
                            setFilterStrength(event.target.value);
                        }}
                        step='1'
                    />
                    <RangeButton
                        onClick={() => {
                            const effect = availableEffects.find(effectToFind => effectToFind.label === selectedEffect);
                            if (effect) {
                                effect.applyEffect();
                            }
                        }}
                    >
                        Apply
                    </RangeButton>
                </RangeContainer>
            )}
            <SelectContainer>
                <SelectInput
                    defaultChecked='default'
                    onChange={event => {
                        const { value } = event.target;
                        const effect = availableEffects.find(effectToFind => effectToFind.label === value);
                        if (effect) {
                            effect.applyEffect();
                        }
                        setSelectedEffect(value);
                    }}
                    value={selectedEffect}
                >
                    <option value='default' disabled>
                        Select effect
                    </option>
                    {availableEffects.map(effect => (
                        <option value={effect.label} key={effect.label}>
                            {effect.label}
                        </option>
                    ))}
                </SelectInput>
            </SelectContainer>
            <ButtonContainer justifyContent='space-evenly'>
                <Button
                    onClick={() => {
                        clear();
                        deleteFileFromMemory();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        const newFile = toFile();
                        downloadFile(newFile);
                    }}
                >
                    Download
                </Button>
            </ButtonContainer>
        </FlexContainer>
    );
}

export default Canvas;

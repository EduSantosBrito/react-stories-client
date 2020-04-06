import React, { useContext, useEffect } from 'react';
import { Input, Label, UploadContainer } from './styled';
import { FileContext } from '../../contexts/FileProvider';

function UploadInput() {
    const { isUploading, setupEventListeners, isFileReaderSupported, isDragAndDropSupported, saveFileToMemory } = useContext(FileContext);

    useEffect(() => {
        if (setupEventListeners && isDragAndDropSupported() && isFileReaderSupported()) {
            setupEventListeners();
        }
    }, [isDragAndDropSupported, isFileReaderSupported, setupEventListeners]);

    return (
        <UploadContainer isUploading={isUploading} id='uploadContainer'>
            <Input
                onChange={event => {
                    event.preventDefault();
                    event.stopPropagation();
                    const [fileToSave] = event.target.files;
                    saveFileToMemory(fileToSave);
                }}
                type='file'
                name='file'
                id='file'
            />
            <Label htmlFor='file'>{isDragAndDropSupported() ? 'Drag and drop a file, or click to start' : 'Click to start'}</Label>
        </UploadContainer>
    );
}

export default UploadInput;

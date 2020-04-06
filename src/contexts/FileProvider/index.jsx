import React, { createContext, useCallback, useMemo, useState } from 'react';

export const FileContext = createContext({
    file: null,
    isUploading: false,
    saveFileToMemory: () => {},
    deleteFileFromMemory: () => {},
    downloadFileFromMemory: () => {},
    setupEventListeners: () => {},
    isDragAndDropSupported: () => {},
    isFileReaderSupported: () => {},
});

function FileProvider({ children }) {
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);

    const preventDefaults = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const isDragAndDropSupported = useCallback(() => {
        const div = document.createElement('div');
        return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div);
    }, []);

    const isFileReaderSupported = useCallback(() => {
        return 'FormData' in window && 'FileReader' in window;
    }, []);

    const saveFileToMemory = useCallback(fileToSave => {
        setFile(fileToSave);
    }, []);

    const setupEventListeners = useCallback(() => {
        const uploadContainer = document.getElementById('uploadContainer');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadContainer.addEventListener(eventName, preventDefaults, false);
        });
        uploadContainer.addEventListener(
            'drop',
            event => {
                const [fileToSave] = event.dataTransfer.files;
                saveFileToMemory(fileToSave);
            },
            false,
        );
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadContainer.addEventListener(
                eventName,
                () => {
                    setIsUploading(true);
                },
                false,
            );
        });
        ['dragleave', 'drop'].forEach(eventName => {
            uploadContainer.addEventListener(
                eventName,
                () => {
                    setIsUploading(false);
                },
                false,
            );
        });
    }, [saveFileToMemory, preventDefaults]);

    const downloadFile = useCallback(
        url => {
            const fileUrl = url || window.URL.createObjectURL(file);
            const a = document.createElement('a');
            a.download = file.name;
            a.style.display = 'none';
            a.href = fileUrl;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(fileUrl);
        },
        [file],
    );

    const deleteFileFromMemory = useCallback(() => {
        setFile(null);
    }, []);

    const state = useMemo(
        () => ({
            file,
            saveFileToMemory,
            downloadFile,
            deleteFileFromMemory,
            isUploading,
            setupEventListeners,
            isDragAndDropSupported,
            isFileReaderSupported,
        }),
        [
            downloadFile,
            deleteFileFromMemory,
            file,
            isUploading,
            saveFileToMemory,
            setupEventListeners,
            isDragAndDropSupported,
            isFileReaderSupported,
        ],
    );

    return <FileContext.Provider value={state}>{children}</FileContext.Provider>;
}

export default FileProvider;

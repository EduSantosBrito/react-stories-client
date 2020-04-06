import React, { useContext } from 'react';
import Canvas from '../components/Canvas';
import UnsupportedBrowser from '../components/UnsupportedBrowser';
import UploadInput from '../components/UploadInput';
import { FileContext } from '../contexts/FileProvider';
import { FlexContainer } from '../shared';

function App() {
    const { isFileReaderSupported, file } = useContext(FileContext);

    if (!isFileReaderSupported) {
        return <UnsupportedBrowser />;
    }

    if (file) {
        return <Canvas />;
    }

    return (
        <FlexContainer width='100%' height='100%'>
            <UploadInput />
        </FlexContainer>
    );
}

export default App;

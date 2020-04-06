import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FabricProvider from './contexts/FabricProvider';
import FileProvider from './contexts/FileProvider';

ReactDOM.render(
    <React.StrictMode>
        <FabricProvider>
            <FileProvider>
                <App />
            </FileProvider>
        </FabricProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

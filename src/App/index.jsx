import React from 'react';
import FabricProvider from '../contexts/FabricProvider';
import Canvas from '../components/Canvas';

function App() {
    return (
        <FabricProvider>
            <Canvas />
        </FabricProvider>
    );
}

export default App;

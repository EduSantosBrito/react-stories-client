import React from 'react';
import { FlexContainer } from '../../shared';
import { Draw, ErrorTitle } from './styled';

function UnsupportedBrowser() {
    return (
        <FlexContainer width='100%' height='100%' flexDirection='column'>
            <Draw src='/unsupportedBrowser.svg' alt='Three women using smartphones, with some web browsers logos flying around them' />
            <ErrorTitle>Your browser don&apos;t support file reader function, try again in another browser.</ErrorTitle>
        </FlexContainer>
    );
}

export default UnsupportedBrowser;

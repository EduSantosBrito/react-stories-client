import styled from 'styled-components';
import { FlexContainer } from '../../shared';

export const Input = styled.input`
    display: none;
`;

export const Label = styled.label`
    font-weight: 700;
    color: #707070;
    cursor: pointer;
    &:hover {
        color: #232946;
    }
`;

export const UploadContainer = styled(FlexContainer)`
    min-width: 320px;
    max-width: 500px;
    width: 100%;
    min-height: 320px;
    max-height: 500px;
    height: 100%;
    outline: 2px dashed black;
    outline-offset: -10px;
    border-radius: 2px;
    background-color: ${({ isUploading }) => (!isUploading ? '#bdbdbd' : '#cccccc')};
`;

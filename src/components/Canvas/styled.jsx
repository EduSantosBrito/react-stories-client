import styled from 'styled-components';
import { FlexContainer, Button } from '../../shared';

export const ButtonContainer = styled(FlexContainer)`
    min-width: 320px;
    max-width: 500px;
    width: 100%;
    margin: 20px 0px;
`;

export const RangeContainer = styled(FlexContainer)`
    min-width: 320px;
    max-width: 500px;
    width: 100%;
    margin: 20px 0px;
`;

export const RangeCount = styled.p`
    font-weight: 700;
    font-size: 1rem;
    color: #6246ea;
    margin: 5px 0px;
`;

export const RangeInput = styled.input`
    -webkit-appearance: none;
    width: 90%;
    height: 10px;
    border-radius: 5px;
    background: #bdbdbd;
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #6246ea;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #6246ea;
        cursor: pointer;
    }
`;

export const RangeButton = styled(Button)`
    margin: 10px 0px;
`;

export const SelectContainer = styled.div`
    margin: 5px 0px;
    display: inline-block;
    position: relative;
    outline: none;
    overflow: hidden;
    height: 28px;
    width: 150px;
    background: #f2f2f2;
    border: 1px solid;
    border-color: white #f7f7f7 whitesmoke;
    border-radius: 3px;
    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);

    &:before,
    &:after {
        content: '';
        position: absolute;
        z-index: 2;
        top: 9px;
        right: 10px;
        width: 0;
        height: 0;
        border: 4px dashed;
        border-color: #888888 transparent;
        pointer-events: none;
    }

    &:before {
        border-bottom-style: solid;
        border-top: none;
    }

    &:after {
        margin-top: 7px;
        border-top-style: solid;
        border-bottom: none;
    }
`;

export const SelectInput = styled.select`
    position: relative;
    outline: none;
    width: 100%;
    margin: 0;
    padding: 6px 8px 6px 10px;
    height: 28px;
    line-height: 14px;
    font-size: 1rem;
    color: #62717a;
    text-shadow: 0 1px white;
    background: #f2f2f2; /* Fallback for IE 8 */
    background: rgba(0, 0, 0, 0) !important; /* "transparent" doesn't work with Opera */
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
    &:focus {
        z-index: 3;
        width: 100%;
        color: #394349;
    }
    > option {
        margin: 3px;
        padding: 6px 8px;
        text-shadow: none;
        background: #f2f2f2;
        border-radius: 3px;
        cursor: pointer;
    }
`;

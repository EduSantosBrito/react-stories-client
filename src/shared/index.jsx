import styled from 'styled-components';

export const FlexContainer = styled.div`
    margin: ${({ margin }) => margin || '0px'};
    padding: ${({ padding }) => padding || '0px'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justifyContent }) => justifyContent || 'center'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
`;

export const GridContainer = styled.div`
    margin: ${({ margin }) => margin || '0px'};
    padding: ${({ padding }) => padding || '0px'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    display: grid;
    grid-template-columns: ${({ columns }) => columns || '1fr'};
    grid-template-rows: ${({ rows }) => rows || '1fr'};
    grid-column-gap: ${({ columnGap }) => columnGap || 0};
    grid-row-gap: ${({ rowGap }) => rowGap || 0};
`;

export const GridArea = styled(FlexContainer)`
    grid-area: ${({ gridArea }) => gridArea || 'auto'};
`;

export const AbsoluteContainer = styled.div`
    position: absolute;
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    top: ${({ top }) => top || 'auto'};
    bottom: ${({ bottom }) => bottom || 'auto'};
    right: ${({ right }) => right || 'auto'};
    left: ${({ left }) => left || 'auto'};
`;

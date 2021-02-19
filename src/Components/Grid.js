import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: ${props => props.columns !== undefined ? props.columns : '1fr 1fr 1fr'};
`;

export default Grid;
import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.h4`
    font-size: 1.2em;
    margin: 10px;
`;

const Heading = ({value}) => {
    return (
        <StyledComp>{value}</StyledComp>
    );
}

export default Heading;
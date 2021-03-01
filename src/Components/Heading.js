import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.h4`
    font-size: 1.2em;
    margin: 10px;
    ${props => props.size ? `font-size: ${props.size}` : ''};
`;

const Heading = ({value, ...rest}) => {
    return (
        <StyledComp {...rest}>{value}</StyledComp>
    );
}

export default Heading;
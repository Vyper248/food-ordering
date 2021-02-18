import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    position: relative;
    display: inline-block;
    margin: 5px;
    border: 1px solid var(--menu-border-color);
    padding: 10px;
    border-radius: 5px;
    ${props => props.width ? 'width: '+props.width : ''};
`;

const Card = ({children, width}) => {
    return (
        <StyledComp width={width}>{children}</StyledComp>
    );
}

export default Card;
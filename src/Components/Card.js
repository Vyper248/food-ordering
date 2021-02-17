import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: inline-block;
    margin: 5px;
    border: 1px solid var(--menu-border-color);
    padding: 10px;
    border-radius: 5px;
`;

const Card = ({children}) => {
    return (
        <StyledComp>{children}</StyledComp>
    );
}

export default Card;
import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.button`
    background-color: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--menu-border-color);
    border-radius: 5px;
    margin: 5px;
    padding: 10px;

    &:hover {
        background-color: var(--menu-selected-color);
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const Button = ({value, onClick}) => {
    return (
        <StyledComp onClick={onClick}>{value}</StyledComp>
    );
}

export default Button;
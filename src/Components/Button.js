import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.button`
    background-color: ${props => props.bgColor.length > 0 ? props.bgColor : 'var(--button-bg-color);'};
    color: var(--button-text-color);
    border: 1px solid var(--button-border-color);
    border-radius: 5px;
    margin: 5px;
    padding: 0px 10px;
    height: var(--input-height);
    ${props => props.width ? `width: ${props.width}` : ''};

    &:hover {
        background-color: var(--button-highlight-color);
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }

    &.selected {
        background-color: var(--button-highlight-color);
    }
`;

const Button = ({value, onClick, selected=false, bgColor='', ...rest}) => {
    return (
        <StyledComp onClick={onClick} className={selected ? 'selected' : ''} bgColor={bgColor} {...rest}>{value}</StyledComp>
    );
}

export default Button;
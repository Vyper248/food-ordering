import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--input-height);
    margin: 5px;
    border-radius: 5px;
    border: 1px solid var(--menu-border-color);
    background-color: var(--label-color);
    color: var(--text-color);
    padding: 0px 10px;
    ${props => props.width ? 'width: '+props.width : ''};
    ${props => props.width ? 'min-width: '+props.width : ''};

    ${props => props.basic ? `
        border: none;
        background-color: transparent;
    ` : ''};
`;

const Label = ({value, ...rest}) => {
    return (
        <StyledComp {...rest}>{value}</StyledComp>
    );
}

export default Label;
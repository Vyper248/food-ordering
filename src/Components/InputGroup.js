import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: flex;
    margin: 5px auto;
    justify-content: center;

    & > * {
        margin: 0px !important;
        border-radius: 0px;
        border-color:var(--menu-border-color);
    }

    & > *:first-child {
        border-radius: 5px 0px 0px 5px;
        border-right: none;
    }

    & > *:last-child {
        border-radius: 0px 5px 5px 0px;
    }
`;

const InputGroup = ({children}) => {
    return (
        <StyledComp>{children}</StyledComp>
    );
}

export default InputGroup;
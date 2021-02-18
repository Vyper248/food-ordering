import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.table`
    border-collapse: collapse;

    & td {
        padding: 5px;
        text-align: center;
        border: 1px solid var(--menu-border-color);
    }

    & th {
        background-color: #222;
        padding: 3px;
        border-right: 1px solid var(--menu-border-color);
        border-left: 1px solid var(--menu-border-color);
    }

    & .category {
        background-color: #444;
    }

    & .name {
        width: 185px;
        background-color: #222;
    }

    & .done {
        background-color: green;
    }
    
    & .name:hover {
        cursor: pointer;
    }

    & .size {
        width: 135px;
    }

    & .qty {
        width: 45px;
    }

    & .note {
        width: 140px
    }
`;

const Table = ({children}) => {
    return (
        <StyledComp>{children}</StyledComp>
    );
}

export default Table;
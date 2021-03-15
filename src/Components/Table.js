import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;

    & td {
        padding: 5px;
        text-align: center;
        border: 1px solid var(--item-border-color);
    }

    & th {
        background-color: #222;
        padding: 5px;
        border: 1px solid var(--item-border-color);
    }

    & td > input {
        border: none;
        margin: 0px;
        height: 100%;
        text-transform: capitalize;
    }

    & td.input .insert {
        display: none;
    }

    & tr:hover .insert {
        display: block;
    }

    & td.capitalize {
        text-transform: capitalize;
    }

    & td.input {
        padding: 0px;
        height: 38px;
        position: relative;
    }

    & .category {
        background-color: #444;
        height: 38px;
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

    & .order-row:focus-within td {
        border-top: 2px solid var(--button-border-color);
        border-bottom: 2px solid var(--button-border-color);
    }
`;

export default Table;
import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;

    & td {
        padding: 5px;
        text-align: center;
        border: 1px solid var(--menu-border-color);
    }

    & th {
        background-color: #222;
        padding: 5px;
        border: 1px solid var(--menu-border-color);
    }

    & td > input {
        border: none;
        margin: 0px;
        text-transform: capitalize;
    }

    & td.capitalize {
        text-transform: capitalize;
    }

    & td.input {
        padding: 0px;
    }

    & .category {
        background-color: #444;
        height: 36px;
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

export default Table;
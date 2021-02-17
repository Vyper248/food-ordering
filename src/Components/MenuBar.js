import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const StyledComp = styled.div`
    position: fixed;
    display: flex;
    border-bottom: 1px solid var(--menu-border-color);
    width: 100%;
`;

const StyledMenuItem = styled.div`
    border-right: 1px solid var(--menu-border-color);
    padding: 5px;
    ${props => props.selected ? 'background-color: var(--menu-selected-color);' : ''};

    &:hover {
        background-color: var(--menu-selected-color);
        cursor: pointer;
    }
`;

const MenuItem = ({page, currentPage, onClick}) => {
    return <StyledMenuItem onClick={onClick(page)} selected={currentPage === page ? true : false}>{page}</StyledMenuItem>;
}

const MenuBar = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.page);
    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    const onClick = (page) => (e) => {
        setPage(page);
    }

    return (
        <StyledComp>
            <MenuItem page="Home" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="New Order" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="Order" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="Settings" currentPage={currentPage} onClick={onClick}/>
        </StyledComp>
    );
}

export default MenuBar;
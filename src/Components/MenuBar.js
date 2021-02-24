import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const { ipcRenderer } = window.require('electron');

const StyledComp = styled.div`
    position: fixed;
    display: flex;
    border-bottom: 1px solid var(--menu-border-color);
    width: 100%;
    background-color: var(--background-color);
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
    const currentItem = useSelector(state => state.currentItem);

    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    const getURL = () => {
        ipcRenderer.invoke('get-url');
    }

    useEffect(() => {
        ipcRenderer.on('receive-url', (e, url) => {
            dispatch({type: 'UPDATE_URL', payload: url});
        });
    }, []);

    const onClick = (page) => (e) => {
        setPage(page);
    }

    return (
        <StyledComp>
            <MenuItem page="Home" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="New Order" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="Settings" currentPage={currentPage} onClick={onClick}/>
            <div style={{flexGrow: '1'}}></div>
            { currentPage === 'Order' && currentItem !== undefined ? <StyledMenuItem onClick={getURL} style={{borderLeft: '1px solid var(--menu-border-color)'}}>Set URL</StyledMenuItem> : null }
        </StyledComp>
    );
}

export default MenuBar;
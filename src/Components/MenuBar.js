import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import HeaderMessage from './HeaderMessage';
import EditPopup from './EditPopup';

const { ipcRenderer } = window.require('electron');

const StyledComp = styled.div`
    position: fixed;
    display: flex;
    border-bottom: 1px solid var(--menu-border-color);
    width: 100%;
    background-color: var(--menu-background-color);
    z-index: 10;
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

const MenuItem = ({page, currentPage, onClick, value=page}) => {
    return <StyledMenuItem onClick={onClick(page)} selected={currentPage === page ? true : false}>{value}</StyledMenuItem>;
}

const MenuBar = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.page);
    const message = useSelector(state => state.message);
    const [editOpen, setEditOpen] = useState(false);

    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    const onClick = (page) => (e) => {
        setPage(page);
    }

    const onClickEdit = () => {
        setEditOpen(true);
    }

    const onCloseEdit = () => {
        setEditOpen(false);
    }

    const onPrint = () => {
        ipcRenderer.invoke('print');
    }

    if (currentPage === 'Order') {
        return (
            <StyledComp>
                <MenuItem page="Home" currentPage={currentPage} onClick={onClick} value='Finish'/>
                <div style={{flexGrow: '1'}}></div>
                { editOpen ? <EditPopup onCancel={onCloseEdit}/> : null }
                <StyledMenuItem onClick={onClickEdit} style={{borderLeft: '1px solid var(--menu-border-color)', borderRight: 'none'}}>Edit</StyledMenuItem>
            </StyledComp>
        );
    }

    return (
        <StyledComp>
            { message.text.length > 0 ? <HeaderMessage {...message}/> : null }
            <MenuItem page="Home" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="New Order" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="Template" currentPage={currentPage} onClick={onClick}/>
            <MenuItem page="Settings" currentPage={currentPage} onClick={onClick}/>
        </StyledComp>
    );
}

export default MenuBar;
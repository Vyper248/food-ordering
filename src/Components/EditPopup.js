import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Input from './Input';
import Label from './Label';
import InputGroup from './InputGroup';
import Heading from './Heading';
import Button from './Button';

const { ipcRenderer } = window.require('electron');

const StyledComp = styled.div`
    position: absolute;
    background-color: black;
    padding: 10px;
    border: 1px solid gray;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
`

const EditPopup = ({onCancel}) => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.currentItem);
    const website = useSelector(state => state.website);
    const items = useSelector(state => state.items);
    const orderList = useSelector(state => state.orderList);
    const [urlButtonText, setUrlButtonText] = useState('Set URL');
    
    let itemObj = items.find(obj => obj.id === currentItem);
    let orderObj = orderList.find(obj => obj.id === currentItem);

    const [tempItem, setTempItem] = useState({...itemObj});

    const getURL = () => {
        ipcRenderer.invoke('get-url');
    }

    useEffect(() => {
        let timeout;
        ipcRenderer.on('receive-url', (e, url) => {
            changeDetail('url', url);
            setUrlButtonText('Set URL (Updated)');
            timeout = setTimeout(() => {
                setUrlButtonText('Set URL');
            }, 1000);
        });
        
        return () => {
            ipcRenderer.removeAllListeners('receive-url');
            if (timeout !== undefined) clearTimeout(timeout);
        }
    }, []);
    
    if (itemObj === undefined) {
        return <StyledComp>No Item Selected</StyledComp>;
    }

    const onChangeName = (value) => {
        setTempItem({...tempItem, name: value});
    }

    const onChangeSize = (value) => {
        changeDetail('size', value);
    }

    const onChangeNote = (value) => {
        changeDetail('note', value);
    }

    const changeDetail = (key, value) => {
        let details = {...tempItem.details};
        let websiteObj = {...details[website]};
        websiteObj[key] = value;
        details[website] = websiteObj;
        setTempItem({...tempItem, details: details});
    }

    const onSave = () => {
        let orderItem = {...tempItem, qty: orderObj.qty};
        dispatch({type: 'UPDATE_ITEM', payload: tempItem});
        dispatch({type: 'UPDATE_ORDER_LIST', payload: orderItem});
        onCancel();
    }

    return (
        <StyledComp>
            <Heading value='Edit'/>
            <InputGroup>
                <Label value='Name' width='80px'/>
                <Input value={tempItem.name} onChange={onChangeName}/>
            </InputGroup>
            <InputGroup>
                <Label value='Weight' width='80px'/>
                <Input value={tempItem.details[website].size} onChange={onChangeSize}/>
            </InputGroup>
            <InputGroup>
                <Label value='Note' width='80px'/>
                <Input value={tempItem.details[website].note} onChange={onChangeNote}/>
            </InputGroup>
            <InputGroup>
                <Label value='URL' width='80px'/>
                <Button value={urlButtonText} width='167px' onClick={getURL}/>
            </InputGroup>
            <Button value='Cancel' onClick={onCancel}/>
            <Button value='Save'onClick={onSave}/>
        </StyledComp>
    );
}

export default EditPopup;
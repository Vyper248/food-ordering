import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FaRegSave, FaPlus } from 'react-icons/fa';

import { filterDeleted } from '../functions';

import Input from './Input';

const SideButton = styled.div`
    padding: 8px;
    width: 40px;
    height: 100%;
    border-right: 1px solid var(--menu-border-color);
    font-size: 1.2em;
    background-color: var(--background-color);

    &:hover {
        background-color: var(--menu-border-color);
        cursor: pointer;
    }
`;

const OrderItem = ({itemString, loadUrl=()=>{}, allowEdit, empty}) => {
    let item = JSON.parse(itemString);
    const dispatch = useDispatch();
    const websites = useSelector(state => filterDeleted(state.websites), shallowEqual);
    const website = useSelector(state => state.website);
    const setCurrentItem = (value) => dispatch({type: 'SET_CURRENT_ITEM', payload: value});
    const updateOrderList = (value) => dispatch({type: 'UPDATE_ORDER_LIST', payload: value});
    const insertItem = (value) => dispatch({type: 'INSERT_ORDER_ITEM', payload: value});
    const updateItem = (value) => dispatch({type: 'UPDATE_ITEM', payload: value});
    const addItem = (value) => dispatch({type: 'INSERT_ITEM', payload: value});
    const [done, setDone] = useState(false);
    const [changed, setChanged] = useState(false);

    let currentWebsite = websites.find(obj => obj.id === website);
    if (currentWebsite === undefined && websites.length === 0) return null;
    if (currentWebsite === undefined) currentWebsite = websites[0];

    let details = item.details[website];
    if (details === undefined) details = {size: '', url: '', note: ''};

    let url = details.url;
    if (url.length > 0 && !url.includes('http')) url = currentWebsite.searchURL + details.url;
    if (url.length === 0) url = currentWebsite.searchURL + item.name;

    if (empty === false && (item.qty === undefined || item.qty === 0)) return null;

    const onChangeItem = (key) => (value) => {
        if (key === 'qty' && isNaN(value)) item.qty = 0;
        if (key !== 'size' && key !== 'note') item[key] = value;
        else item.details[website][key] = value;
        updateOrderList(item);
        if (key !== 'qty') setChanged(true);
    }

    const onSaveItem = () => {
        if (item.new) {
            delete item.new;
            delete item.qty;
            addItem(item);
            onChangeItem('new')(false);
            setChanged(false);
        } else {
            let itemCopy = {...item};
            delete itemCopy.qty;
            updateItem(itemCopy);
            setChanged(false);
        }
    }

    const onInsertItem = () => {
        let details = {};
        details[website] = {size: '', note: '', url: ''};
        let newItem = {
            new: true,
            order: item.order+1,
            name: '',
            category: item.category,
            qty: '',
            details: details
        }
        insertItem(newItem);
    }

    const onClickItem = () => {
        loadUrl(url)();
        setDone(true);
        setCurrentItem(item.id);
    }

    if (allowEdit) {
        return (
            <tr>
                <td className='input'>
                    <div style={{display: 'inline-flex', float: 'left', height: '100%', position: 'absolute', left: '0px', top: '0px', bottom: '0px'}}>
                        { changed ? <SideButton onClick={onSaveItem}><FaRegSave/></SideButton> : null }
                        <SideButton className='insert' onClick={onInsertItem}><FaPlus/></SideButton>
                    </div>
                        <Input value={item.name} onChange={onChangeItem('name')}/>
                </td>
                <td className='input' width='150px'><Input value={details.size} onChange={onChangeItem('size')} width='150px'/></td>
                <td className='input' width='100px'><Input type='number' value={isNaN(item.qty) ? '' : item.qty} onChange={onChangeItem('qty')} width='100px' tabIndex='1'/></td>
                <td className='input'><Input value={details.note} onChange={onChangeItem('note')}/></td>
            </tr>
        );
    }

    // console.log('Rendering Order Item: ', item.name);
    return (
        <tr>
            <td className={done ? 'name capitalize done' : 'name capitalize'} onClick={onClickItem}>{item.name}</td>
            <td className='size'>{details.size}</td>
            { item.qty !== undefined ? <td className='qty'>{item.qty}</td> : null }
            <td className='note'>{details.note}</td>
        </tr>
    );
}

const equalityCheck = (prevProps, nextProps) => {
    if (prevProps.empty === nextProps.empty && prevProps.itemString === nextProps.itemString) {
        return true;
    }
    return false;
}

export default React.memo(OrderItem, equalityCheck);
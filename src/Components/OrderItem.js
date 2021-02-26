import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from './Input';

const OrderItem = ({itemString, loadUrl=()=>{}, onChangeItem, empty}) => {
    let item = JSON.parse(itemString);
    const dispatch = useDispatch();
    const websites = useSelector(state => state.websites);
    const website = useSelector(state => state.website);
    const setCurrentItem = (value) => dispatch({type: 'SET_CURRENT_ITEM', payload: value});
    const [done, setDone] = useState(false);

    let currentWebsite = websites.find(obj => obj.id === website);
    if (currentWebsite === undefined && websites.length === 0) return null;
    if (currentWebsite === undefined) currentWebsite = websites[0];

    let details = item.details[website];
    if (details === undefined) details = {size: '', url: '', note: ''};

    let url = details.url;
    if (url.length > 0 && !url.includes('http')) url = currentWebsite.searchURL + details.url;
    if (url.length === 0) url = currentWebsite.searchURL + item.name;

    if (empty === false && (item.qty === undefined || item.qty === 0)) return null;

    const onClickItem = () => {
        loadUrl(url)();
        setDone(true);
        setCurrentItem(item.id);
    }

    if (onChangeItem !== undefined) {
        // console.log('Rending tr');
        return (
            <tr>
                <td className='input'><Input value={item.name} onChange={onChangeItem(item, 'name')}/></td>
                <td className='input' width='150px'><Input value={details.size} onChange={onChangeItem(item, 'size')} width='150px'/></td>
                <td className='input' width='100px'><Input type='number' value={isNaN(item.qty) ? '' : item.qty} onChange={onChangeItem(item, 'qty')} width='100px' tabIndex='1'/></td>
                <td className='input'><Input value={details.note} onChange={onChangeItem(item, 'note')}/></td>
            </tr>
        );
    }

    return (
        <tr>
            <td className={done ? 'name done' : 'name'} onClick={onClickItem}>{item.name}</td>
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
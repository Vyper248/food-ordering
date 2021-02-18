import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const OrderItem = ({item, loadUrl}) => {
    const websites = useSelector(state => state.websites);
    const website = useSelector(state => state.website);
    const [done, setDone] = useState(false);

    let currentWebsite = websites.find(obj => obj.id === website);
    if (currentWebsite === undefined && websites.length === 0) return null;
    if (currentWebsite === undefined) currentWebsite = websites[0];

    let url = item.url;
    if (url.length > 0 && !url.includes('http')) url = currentWebsite.searchURL + item.url;
    if (url.length === 0) url = currentWebsite.searchURL + item.name;

    const onClickItem = () => {
        loadUrl(url)();
        setDone(true);
    }

    return (
        <tr>
            <td className={done ? 'name done' : 'name'} onClick={onClickItem}>{item.name}</td>
            <td className='size'>{item.size}</td>
            { item.qty !== undefined ? <td className='qty'>{item.qty}</td> : null }
            <td className='note'>{item.note}</td>
        </tr>
    );
}

export default OrderItem;
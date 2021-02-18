import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterDeleted } from '../functions';

import OrderItem from '../Components/OrderItem';
import OrderGroup from '../Components/OrderGroup';
import Table from '../Components/Table';

const { ipcRenderer } = window.require('electron');

const Order = () => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const website = useSelector(state => state.website);
    const categories = useSelector(state => filterDeleted(state.categories));
    const items = useSelector(state => filterDeleted(state.items));

    const websiteItems = items.map(item => {
        const details = item.details[website];
        let newItem = {
            name: item.name,
            id: item.id,
            order: item.order,
            category: item.category,
            size: details.size,
            note: details.note,
            url: details.url
        }
        return newItem;
    });

    const empty = orderList.length === 0 ? true : false;

    const loadUrl = (url) => () => {
		ipcRenderer.invoke('send-url', url);
	}

    const itemArray = empty ? websiteItems : orderList;

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        { empty ? null : <th>Qty</th> }
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(category => {
                            return <OrderGroup key={`order-group-${category.id}`} category={category} orderList={itemArray} loadUrl={loadUrl}/>
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Order;
import React from 'react';
import { useSelector } from 'react-redux';

import { filterDeleted, getTotalQty } from '../functions';

import OrderGroup from '../Components/OrderGroup';
import Table from '../Components/Table';

const { ipcRenderer } = window.require('electron');

const Order = () => {
    const orderList = useSelector(state => state.orderList);
    const categories = useSelector(state => filterDeleted(state.categories));

    const empty = orderList.length === 0 || getTotalQty(orderList) === 0 ? true : false;

    const loadUrl = (url) => () => {
		ipcRenderer.invoke('send-url', url);
	}

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
                    <OrderGroup title={'Other'} category={'0'} loadUrl={loadUrl} empty={empty}/>
                    {
                        categories.map(category => {
                            return <OrderGroup key={`order-group-${category.id}`} title={category.name} category={category.id} loadUrl={loadUrl} empty={empty}/>
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Order;
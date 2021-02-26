import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterDeleted, getTotalQty } from '../functions';

import OrderGroup from '../Components/OrderGroup';
import Table from '../Components/Table';

const { ipcRenderer } = window.require('electron');

const Order = () => {
    const orderList = useSelector(state => state.orderList);
    const categories = useSelector(state => filterDeleted(state.categories));
    const items = useSelector(state => filterDeleted(state.items));

    const empty = orderList.length === 0 || getTotalQty(orderList) === 0 ? true : false;

    const loadUrl = (url) => () => {
		ipcRenderer.invoke('send-url', url);
	}

    const itemArray = empty ? items : orderList;

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
                            let filtered = itemArray.filter(obj => obj.category === category.id);
                            return <OrderGroup key={`order-group-${category.id}`} title={category.name} orderList={JSON.stringify(filtered)} loadUrl={loadUrl} empty={empty}/>
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Order;
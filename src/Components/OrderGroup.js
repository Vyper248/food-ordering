import React from 'react';

import { getTotalQty } from '../functions';

import OrderItem from './OrderItem';

const OrderGroup = ({category, orderList, empty, ...rest}) => {
    let filtered = orderList.filter(obj => obj.category === category.id);
    if (filtered.length === 0) return null;

    if (empty === false && getTotalQty(filtered) === 0) return null;

    return (
        <React.Fragment>
            <tr>
                <td colSpan='4' className='category'>{category.name}</td>
            </tr>
            {
                filtered.map(item => {
                    return <OrderItem key={`orderItem-${category.id}-${item.name}-${item.id}`} item={item} empty={empty} {...rest}/>
                })
            }
        </React.Fragment>
    );
}

export default OrderGroup;
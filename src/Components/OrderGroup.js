import React from 'react';

import OrderItem from './OrderItem';

const OrderGroup = ({category, orderList, loadUrl}) => {
    let filtered = orderList.filter(obj => obj.category === category.id);
    if (filtered.length === 0) return null;

    return (
        <React.Fragment>
            <tr>
                <td colSpan='4' className='category'>{category.name}</td>
            </tr>
            {
                filtered.map(item => {
                    return <OrderItem key={`orderItem-${item.id}`} item={item} loadUrl={loadUrl}/>
                })
            }
        </React.Fragment>
    );
}

export default OrderGroup;
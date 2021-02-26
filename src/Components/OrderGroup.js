import React from 'react';

import { getTotalQty } from '../functions';

import OrderItem from './OrderItem';

const OrderGroup = ({title, orderList, empty, ...rest}) => {
    let list = JSON.parse(orderList);
    if (list.length === 0) return null;

    if (empty === false && getTotalQty(list) === 0) return null;

    // console.log('Rendering OrderGroup');
    return (
        <React.Fragment>
            <tr>
                <td colSpan='4' className='category'>{title}</td>
            </tr>
            {
                list.map(item => {
                    return <OrderItem key={`orderItem-${title}-${item.name}-${item.id}`} itemString={JSON.stringify(item)} empty={empty} {...rest}/>
                })
            }
        </React.Fragment>
    );
}

const equalityCheck = (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title && prevProps.orderList === nextProps.orderList) {
        return true;
    }
    return false;
}

export default React.memo(OrderGroup, equalityCheck);
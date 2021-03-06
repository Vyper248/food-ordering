import React from 'react';
import { useSelector } from 'react-redux';

import { getTotalQty } from '../functions';

import OrderItem from './OrderItem';

const OrderGroup = ({title, category, empty, filterItems=false, ...rest}) => {
    let filter = useSelector(state => state.filter);
    let list = useSelector(state => {
        let arrString = empty ? JSON.stringify(state.items.filter(obj => obj.category === category && obj.deleted === undefined))
        : JSON.stringify(state.orderList.filter(obj => obj.category === category && obj.deleted === undefined));
        return arrString;
    });
    list = JSON.parse(list);
    list.sort((a,b) => a.order - b.order);
    if (filterItems) list = list.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()));

    if (list.length === 0) return null;

    if (empty === false && getTotalQty(list) === 0) return null;

    return (
        <React.Fragment>
            <tr>
                <td colSpan='4' className='category'>{title}</td>
            </tr>
            {
                list.map(item => {
                    return <OrderItem key={`orderItem-${category}-${item.id}-${item.order}`} itemString={JSON.stringify(item)} empty={empty} {...rest}/>
                })
            }
        </React.Fragment>
    );
}

const equalityCheck = (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title && prevProps.category === nextProps.category && prevProps.empty === nextProps.empty) {
        return true;
    }
    return false;
}

export default React.memo(OrderGroup, equalityCheck);
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterDeleted } from '../functions';

import Heading from '../Components/Heading';
import Card from '../Components/Card';
import Button from '../Components/Button';

const Home = () => {
    const dispatch = useDispatch();
    const websites = useSelector(state => filterDeleted(state.websites));

    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});
    const setWebsite = (value) => dispatch({type: 'SET_WEBSITE', payload: value});

    const onClickEmptyOrder = (website) => () => {
        setPage('Order');
        setWebsite(website);
    }

    const onClickNewOrder = (website) => () => {
        setPage('New Order');
        setWebsite(website);
    }

    return (
        <div>
            <Heading value='Home'/>
            {
                websites.map(website => {
                    return <Card key={'website-'+website.id}>
                        <Heading value={website.name}/>
                        <Button value='New Order' onClick={onClickNewOrder(website)}/>
                        <Button value='Empty Order' onClick={onClickEmptyOrder(website)}/>
                    </Card>;
                })
            }
        </div>
    );
}

export default Home;
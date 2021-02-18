import React, { useState } from 'react';

import Heading from '../Components/Heading';
import Button from '../Components/Button';

import Websites from './Websites';
import Categories from './Categories';
import Items from './Items';

const Settings = () => {
    const [page, setPage] = useState('Websites');

    const onChangePage = (page) => () => {
        setPage(page);
    }

    return (
        <div>
            <Heading value='Settings'/>
            <Button value="Websites" onClick={onChangePage('Websites')} selected={page === 'Websites' ? true : false}/>
            <Button value="Categories" onClick={onChangePage('Categories')} selected={page === 'Categories' ? true : false}/>
            <Button value="Items" onClick={onChangePage('Items')} selected={page === 'Items' ? true : false}/>

            { page === 'Websites' ? <Websites/> : null }
            { page === 'Categories' ? <Categories/> : null }
            { page === 'Items' ? <Items/> : null }
        </div>
    );
}

export default Settings;
import React, { useState } from 'react';

import Heading from '../Components/Heading';
import Button from '../Components/Button';

import Websites from './Websites';
import Categories from './Categories';
import Items from './Items';
import Sync from './Sync';
import Backup from './Backup';

const Settings = () => {
    const [page, setPage] = useState('Items');

    const onChangePage = (page) => () => {
        setPage(page);
    }

    return (
        <div>
            <Heading value='Settings'/>
            <Button value="Websites" onClick={onChangePage('Websites')} selected={page === 'Websites' ? true : false}/>
            <Button value="Categories" onClick={onChangePage('Categories')} selected={page === 'Categories' ? true : false}/>
            <Button value="Items" onClick={onChangePage('Items')} selected={page === 'Items' ? true : false}/>
            <Button value="Sync" onClick={onChangePage('Sync')} selected={page === 'Sync' ? true : false}/>
            <Button value="Backup" onClick={onChangePage('Backup')} selected={page === 'Backup' ? true : false}/>

            { page === 'Websites' ? <Websites/> : null }
            { page === 'Categories' ? <Categories/> : null }
            { page === 'Items' ? <Items/> : null }
            { page === 'Sync' ? <Sync/> : null }
            { page === 'Backup' ? <Backup/> : null }
        </div>
    );
}

export default Settings;
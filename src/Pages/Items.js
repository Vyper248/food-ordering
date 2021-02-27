import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { TiArrowUnsorted } from 'react-icons/ti';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';

import { filterDeleted } from '../functions';

import Heading from '../Components/Heading';
import Button from '../Components/Button';
import Table from '../Components/Table';
import Input from '../Components/Input';
import Dropdown from '../Components/Dropdown';
import Label from '../Components/Label';
import Grid from '../Components/Grid';
import InputGroup from '../Components/InputGroup';

const Icon = styled.div`
    color: ${props => props.color ? props.color : 'white'};
`;

const TDButton = styled.td`
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const Items = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => filterDeleted(state.categories));
    let firstCategory = categories.length > 0 ? categories[0] : {};
    const [category, setCategory] = useState(firstCategory.id);

    const items = useSelector(state => filterDeleted(state.items));

    const websites = useSelector(state => filterDeleted(state.websites));
    const firstWebsite = websites.length > 0 ? websites[0] : {};
    const [website, setWebsite] = useState(firstWebsite.id);

    const addItem = (item) => dispatch({type: 'ADD_ITEM', payload: item});
    const updateItem = (item) => dispatch({type: 'UPDATE_ITEM', payload: item});
    const reorderItem = (item) => dispatch({type: 'REORDER_ITEM', payload: item});
    const deleteItem = (id) => dispatch({type: 'REMOVE_ITEM', payload: id});
    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    if (categories.length === 0) return <p>You must add a category to add items to.</p>
    if (websites.length === 0) return <p>You must add a website before adding items.</p>
    
    const filteredItems = items.filter(item => item.category === category).sort((a, b) => a.order - b.order);

    const onClickCategory = (id) => () => {
        setCategory(id);
    }

    const onChangeWebsite = (value) => {
        setWebsite(value);
    }

    const addNewItem = () => {
        let latestOrder = filteredItems.length > 0 ? filteredItems[filteredItems.length-1].order : 0;

        let details = {};
        websites.forEach(website => {
            details[website.id] = {
                size: '',
                url: '',
                note: ''
            }
        });

        let item = {
            name: '',
            category: category,
            order: latestOrder+1,
            details: details
        };

        addItem(item);
    }

    const onChangeItem = (item, key) => (value) => {
        let newItem = {...item};
        newItem[key] = value;
        updateItem(newItem);
    }

    const onChangeItemDetails = (item, website, key) => (value) => {
        let newItem = {...item};
        let details = newItem.details[website];
        if (details === undefined) {
            details = {size: '', url: '', note: ''};
            newItem.details[website] = details;
        }
        details[key] = value;
        updateItem(newItem);
    }

    const onDeleteItem = (item) => () => {
        deleteItem(item.id);
    }

    const reorder = (data) => {
        data.forEach((item, i) => {
            let newItem = {...item};
            newItem.order = i;
            let oldItem = filteredItems.find(obj => obj.id === item.id);
            reorderItem(newItem);
        });
    }

    return (
        <div>
            <Heading value='Items'/>
            {
                categories.map(cat => {
                    return <Button key={`category-${cat.id}`} value={cat.name} onClick={onClickCategory(cat.id)} selected={category === cat.id}/>
                })
            }
            <br/>
            <Grid>
                <InputGroup>
                    <Label value='Website' width='100px'/>
                    <Dropdown options={websites.map(obj => ({value: obj.id, display: obj.name}))} onChange={onChangeWebsite} width='100px'/>
                </InputGroup>
                <Button value='Add New' onClick={addNewItem} width='150px'/>
            </Grid>
            { filteredItems.length > 0 ? <Table style={{margin: '10px auto'}}>
                <thead>
                    <tr>
                        <td style={{width: '50px'}}></td>
                        <td>Name</td>
                        <td>Size</td>
                        <td>URL</td>
                        <td>Note</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <ReactSortable list={filteredItems} setList={reorder} handle='.handle' tag='tbody'>
                {
                    filteredItems.map(item => {
                        let details = item.details[website];
                        if (details === undefined) details = {size: '', url: '', note: ''};
                        return <tr key={`${category}-${item.id}`}>
                            <TDButton className="handle"><Icon><TiArrowUnsorted style={{position: 'relative', top: '2px'}}/></Icon></TDButton>
                            <td><Input value={item.name} onChange={onChangeItem(item, 'name')} width='200px'/></td>
                            <td><Input value={details.size} onChange={onChangeItemDetails(item, website, 'size')} width='100px'/></td>
                            <td><Input value={details.url} onChange={onChangeItemDetails(item, website, 'url')} width='300px'/></td>
                            <td><Input value={details.note} onChange={onChangeItemDetails(item, website, 'note')} width='250px'/></td>
                            <TDButton><Icon color='red' onClick={onDeleteItem(item)}><FaTrash/></Icon></TDButton>
                        </tr>;
                    })
                }
                </ReactSortable>
            </Table> : null }
        </div>
    );
}

export default Items;
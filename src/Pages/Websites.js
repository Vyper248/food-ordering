import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { filterDeleted } from '../functions';

import Heading from '../Components/Heading';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Label from '../Components/Label';
import InputGroup from '../Components/InputGroup';
import Card from '../Components/Card';

const DeleteIcon = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    color: red;

    &:hover {
        color: #A00;
        cursor: pointer;
    }
`;

const Websites = () => {
    const dispatch = useDispatch();
    const [newWebsite, setNewWebsite] = useState('');
    const websites = useSelector(state => filterDeleted(state.websites));
    const updateWebsite = (website) => dispatch({type: 'UPDATE_WEBSITE', payload: website});
    const addWebsite = (website) => dispatch({type: 'ADD_WEBSITE', payload: website});
    const removeWebsite = (id) => dispatch({type: 'REMOVE_WEBSITE', payload: id});

    const onChangeNewWebsite = (value) => {
        setNewWebsite(value);
    }

    const addNewWebsite = () => {
        let website = {
            name: newWebsite,
            searchURL: '',
            forceDownload: false
        };
        addWebsite(website);
    }

    const onChangeWebsite = (website, key) => (value) => {
        let newWebsite = {...website};
        newWebsite[key] = value;
        updateWebsite(newWebsite);
    }

    const onDeleteWebsite = (website) => () => {
        removeWebsite(website.id);
    }

    return (
        <div>
            <Heading value='Websites'/>
            <InputGroup>
                <Input value={newWebsite} placeholder='Website Name' onChange={onChangeNewWebsite}/>
                <Button value="Add New" onClick={addNewWebsite}/>
            </InputGroup>
            <br/>
            {
                websites.map(website => {
                    return <Card key={'website-'+website.id} width='100%'>
                        <Heading value={website.name}/>
                        <DeleteIcon onClick={onDeleteWebsite(website)}><FaTrash/></DeleteIcon>
                        <InputGroup>
                            <Label value='Search URL' width='120px'/>
                            <Input value={website.searchURL} onChange={onChangeWebsite(website, 'searchURL')} width='700px'/>
                        </InputGroup>
                        <InputGroup>
                            <Input value={website.forceDownload} onChange={onChangeWebsite(website, 'forceDownload')} type='checkbox'/>
                            <Label value='Force downloading an order before placing it?' basic={true}/>
                        </InputGroup>
                    </Card>;
                })
            }
        </div>
    );
}

export default Websites;
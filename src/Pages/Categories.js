import React from 'react';
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

const Icon = styled.div`
    color: ${props => props.color ? props.color : 'white'};
`;

const TDButton = styled.td`
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => filterDeleted(state.categories));
    const latestOrder = categories.length > 0 ? categories[categories.length-1].order : 0;

    const addCategory = (category) => dispatch({type: 'ADD_CATEGORY', payload: category});
    const updateCategory = (category) => dispatch({type: 'UPDATE_CATEGORY', payload: category});
    const reorderCategory = (category) => dispatch({type: 'REORDER_CATEGORY', payload: category});
    const deleteCategory = (id) => dispatch({type: 'REMOVE_CATEGORY', payload: id});

    const addNewCategory = () => {
        let category = {
            name: '',
            column: 1,
            page: 1,
            rowsAfter: 1,
            order: latestOrder+1,
        };
        addCategory(category);
    }

    const onChangeCategory = (category, key) => (value) => {
        let newCategory = {...category};
        newCategory[key] = value;
        updateCategory(newCategory);
    }

    const onDeleteCategory = (category) => () => {
        deleteCategory(category.id);
    }

    const reorder = (data) => {
        data.forEach((category, i) => {
            let newCategory = {...category};
            newCategory.order = i;
            let oldCategory = categories.find(obj => obj.id === category.id);
            if (newCategory.order !== oldCategory.order) reorderCategory(newCategory);
        });
    }

    return (
        <div>
            <Heading value='Categories'/>
            <Button value='Add New' onClick={addNewCategory}/>
            <Table style={{margin: '10px auto'}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Column</th>
                        <th>Page</th>
                        <th>Rows After</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                    <ReactSortable list={categories} setList={reorder} handle='.handle' tag='tbody'>
                    {
                        categories.map(category => {
                            return <tr key={'category-'+category.id}>
                                <TDButton className="handle"><Icon><TiArrowUnsorted style={{position: 'relative', top: '2px'}}/></Icon></TDButton>
                                <td><Input value={category.name} onChange={onChangeCategory(category, 'name')}/></td>
                                <td><Input value={category.column} type='number' onChange={onChangeCategory(category, 'column')}/></td>
                                <td><Input value={category.page} type='number' onChange={onChangeCategory(category, 'page')}/></td>
                                <td><Input value={category.rowsAfter} type='number' onChange={onChangeCategory(category, 'rowsAfter')}/></td>
                                <TDButton><Icon color='red' onClick={onDeleteCategory(category)}><FaTrash/></Icon></TDButton>
                            </tr>;
                        })
                    }
                    </ReactSortable>
            </Table>
        </div>
    );
}

export default Categories;
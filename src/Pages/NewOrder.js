import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

import { filterDeleted, getTotalQty } from '../functions';

import Heading from '../Components/Heading';
import Dropdown from '../Components/Dropdown';
import Button from '../Components/Button';
import Table from '../Components/Table';
import Grid from '../Components/Grid';
import OrderGroup from '../Components/OrderGroup';
import Input from '../Components/Input';

const ScrollContainer = styled.div`
    overflow: scroll;
    height: calc(100vh - 190px);
`;

const NewOrder = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [downloaded, setDownloaded] = useState(false);
    const websites = useSelector(state => filterDeleted(state.websites));
    const categories = useSelector(state => filterDeleted(state.categories));
    const items = useSelector(state => filterDeleted(state.items));
    const orderList = useSelector(state => state.orderList);
    const website = useSelector(state => state.website);
    const filter = useSelector(state => state.filter);

    const setAppPage = (value) => dispatch({type: 'SET_PAGE', payload: value});
    const changeWebsite = (value) => dispatch({type: 'SET_WEBSITE', payload: value});
    const setOrderList = (value) => dispatch({type: 'SET_ORDER_LIST', payload: value});
    const goToOrder = () => dispatch({type: 'SET_PAGE', payload: 'Order'});
    const setMessage = (value) => dispatch({type: 'SET_MESSAGE', payload: value});
    const setFilter = (value) => dispatch({type: 'SET_FILTER', payload: value});

    useEffect(() => {
        setOrderList(JSON.parse(JSON.stringify(items)));
        setFilter('');
    }, []);

    const onChangePage = (page) => () => {
        setPage(page);
    }

    const onClickImport = () => {
        setAppPage('Import');
    }

    //get page numbers
    let pages = [];
    categories.forEach(category => {
        if (pages.includes(category.page)) return;
        pages.push(category.page);
    });
    pages.sort();

    //get categories for selected page
    let filteredCategories = categories.filter(obj => obj.page === page);
    
    //get number of columns for this page and add categories to column array
    let columns = {};
    filteredCategories.forEach(category => {
        if (columns[category.column] === undefined) columns[category.column] = [];
        columns[category.column].push(category);
    });
    let numberOfColumns = Object.keys(columns).length;

    const parseCommas = (string) => {
        if (string === undefined) return '';
        return string.replace(/,/g, ' ');
    }

    const onDownload = () => {
        setDownloaded(true);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += 'Name, Size, Qty, Note\n';

        categories.forEach(category => {
            let filtered = orderList.filter(obj => obj.category === category.id);
            if (getTotalQty(filtered) > 0) csvContent += `${category.name},,,\n`;
            filtered.forEach(item => {
                if (item.qty !== undefined && item.qty > 0) {
                    let details = item.details[website];
                    if (details === undefined) details = {size: '', note: '', url: ''};
                    csvContent += `${parseCommas(item.name)},${parseCommas(details.size)},${item.qty},${parseCommas(details.note)}\n`;
                }
            });
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Food Order - ${format(new Date(),'yyyy-MM-dd')}.csv`);
        link.click();
    }

    const onOrder = () => {
        let currentWebsite = websites.find(obj => obj.id === website);
        if (currentWebsite !== undefined && currentWebsite.forceDownload && downloaded === false) {
            setMessage({text: 'Please download the order first.', type: 'error'});
            return;
        }
        goToOrder();
    }

    const onChangeFilter = (value) => {
        setFilter(value);
    }

    return (
        <div style={{maxWidth: '1400px', margin: 'auto'}}>
            <Heading value='New Order'/>

            <Grid columns={'185px auto 185px'}>
                <div></div>
                <div>
                    <Button value='Import' onClick={onClickImport}/>
                    <Dropdown value={website} options={websites.map(obj => ({value: obj.id, display: obj.name}))} onChange={changeWebsite} width='150px'/>
                    <Button value='Download' onClick={onDownload}/>
                    <Button value='Order' onClick={onOrder}/>
                </div>
                <div>
                    <Input value={filter} onChange={onChangeFilter} placeholder='Search'/>
                </div>
            </Grid>

            <Grid columns={`repeat(${pages.length}, 1fr)`} style={{gap: '10px', margin: '10px'}}>
            {
                pages.map(pageNumber => {
                    return <Button key={`page-button-${pageNumber}`} value={`Page ${pageNumber}`} width='100%' selected={pageNumber === page} onClick={onChangePage(pageNumber)}/>;
                })
            }
            </Grid>
            <ScrollContainer key={page}>
                <Grid columns={`repeat(${numberOfColumns}, 1fr)`} style={{gap: '10px', margin: '10px'}}>
                {
                    Object.keys(columns).map(key => {
                        let arr = columns[key];
                        return <Table key={`order-table-${key}`} style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <td style={{width: '300px'}}>Name</td>
                                    <td>Size</td>
                                    <td>Qty</td>
                                    <td>Note</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arr.map(category => {
                                        return <OrderGroup key={`order-group-${category.id}`} title={category.name} category={category.id} allowEdit={true} filterItems={true}/>;
                                    })
                                }
                            </tbody>
                        </Table>
                    })
                }
                </Grid>
            </ScrollContainer>
        </div>
    );
}

export default NewOrder;
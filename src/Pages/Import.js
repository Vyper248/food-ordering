import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../Components/Input';
import Heading from '../Components/Heading';
import Button from '../Components/Button';
import Table from '../Components/Table';

const Import = () => {
    const dispatch = useDispatch();

    const [importData, setImportData] = useState([]);
    const items = useSelector(state => state.items);
    const categories = useSelector(state => state.categories);
    const website = useSelector(state => state.website);

    const setOrderList = (value) => dispatch({type: 'SET_ORDER_LIST', payload: value});
    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    const onFileChange = (e) => {
        const file = e.target.files[0];

        if (file.type.match('text/csv')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                let arr = [];

                let lines = reader.result.split('\n').map(line => line.split(','));
                let currentCategory = '';

                for (let i = 1; i < lines.length; i++) {
                    let lineArr = lines[i];
                    let heading = false;
                    let name = lineArr[0];
                    let size = lineArr[1];
                    let qty = lineArr[2];
                    let note = lineArr[3];

                    if (qty === undefined || qty.length === 0) {
                        heading = true;
                        let categoryObj = categories.find(obj => obj.name.toLowerCase() === name.toLowerCase());
                        if (categoryObj !== undefined) currentCategory = categoryObj.id;
                        else currentCategory = categories.length > 0 ? categories[0].id : 0;
                        continue;
                    }

                    let item = items.find(obj => {
                        let details = obj.details[website];
                        if (details === undefined) details = {size: '', url: '', note: ''};
                        return obj.name.toLowerCase() === name.toLowerCase() && details.size.toLowerCase() === size.toLowerCase();
                    });
                    if (item !== undefined) {
                        let copy = {...item};
                        copy.qty = qty;
                        arr.push(copy);
                    } else {
                        let newObj = {
                            name: name,
                            category: currentCategory,
                            qty: qty,
                            details: {}
                        }
                        arr.push(newObj);
                    }
                }

                setImportData(arr);
            }

            reader.readAsText(file);	
        }
    }

    const onImport = () => {
        setOrderList(importData);
        setPage('Order');

    }

    return (
        <div>
            <Heading value="Import"/>

            <input type='file' onChange={onFileChange}/>

            <br/>
            <br/>

            { importData.length > 0 ? <Button value={`Import`} onClick={onImport}/> : null }

            <Table style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                {
                    importData.map(obj => {
                        let details = obj.details[website];
                        if (details === undefined) details = {size: '', url: '', note: ''};
                        return <tr>
                            <td>{obj.name}</td>
                            <td>{details.size}</td>
                            <td>{obj.qty}</td>
                            <td>{obj.note}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Import;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterDeleted } from '../functions';

import Heading from '../Components/Heading';
import Button from '../Components/Button';
import Table from '../Components/Table';

const Import = () => {
    const dispatch = useDispatch();

    const [importData, setImportData] = useState([]);
    const [error, setError] = useState('');
    const items = useSelector(state => filterDeleted(state.items));
    const categories = useSelector(state => state.categories);
    const website = useSelector(state => state.website);

    const setOrderList = (value) => dispatch({type: 'SET_ORDER_LIST', payload: value});
    const setPage = (value) => dispatch({type: 'SET_PAGE', payload: value});

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setError('');

        if (file && file.type.match('text/csv')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                let arr = [];

                let lines = reader.result.split('\n').map(line => line.split(','));
                let currentCategory = '0';

                for (let i = 1; i < lines.length; i++) {
                    let lineArr = lines[i];
                    let name = lineArr[0];
                    let size = lineArr[1];
                    let qty = lineArr[2];

                    if (qty === undefined || qty.length === 0) {
                        let categoryObj = categories.find(obj => obj.name.toLowerCase() === name.toLowerCase());
                        if (categoryObj !== undefined) currentCategory = categoryObj.id;
                        else currentCategory = '0';
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

                if (arr.length === 0) setError('Error: No Items');
                setImportData(arr);
            }

            reader.readAsText(file);	
        } else if (!file) {
            setError('');
            setImportData([]);
        } else if (!file.type.match('text/csv')) {
            setError('Error: File type is not .csv');
        }
    }

    const downloadTemplate = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += 'Name, Size, Qty, Note\n';

        categories.forEach(category => {
            csvContent += `${category.name},,,\n`;
            csvContent += ',,,\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Food Order Template.csv");
        link.click();
    }

    const onImport = () => {
        setOrderList(importData);
        setPage('Order');
    }

    return (
        <div>
            <Heading value="Import"/>

            <Heading value="Step 1: Download the template file." size='1.1em'/>
            <p>This file is in CSV (Comma Separated Files) form, and contains the correct column headings to use, along with an example row.</p>
            <Button onClick={downloadTemplate} value="Download Template"/>

            <Heading value="Step 2: Add data to the template file" size='1.1em'/>
            <p>Add your items to the file, using the headings shown. Do not change the headings, otherwise it may not import correctly.</p>
            <p>If the item can be matched to an existing item, then it will use the details for that item when ordering.</p>
            <p>If the item can not be matched, then it will search by name only, and the item will not be saved for future use.</p>

            <Heading value="Step 3: Save the CSV file and import" size='1.1em'/>
            <p>Use this to import the file. It must be in .csv format or it won't import.</p>
            <p>After selecting the file, you should see a list of items and a button to finish the import. If this doesn't show, there's likely a formatting error.</p>

            <input type='file' onChange={onFileChange}/>

            <br/>
            <br/>

            { importData.length > 0 ? <Button value={`Import`} onClick={onImport}/> : null }

            { importData.length > 0 ? <Table style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Qty</th>
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
                        </tr>
                    })
                }
                </tbody>
            </Table> : null }
            { error.length > 0 && importData.length === 0 ? <p style={{border: '1px solid red', display: 'inline-block', padding: '5px'}}>{error}</p> : null}
        </div>
    );
}

export default Import;
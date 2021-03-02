import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import Heading from '../Components/Heading';
import Button from '../Components/Button';
import Table from '../Components/Table';

const Backup = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    const categories = useSelector(state => state.categories);
    const websites = useSelector(state => state.websites);

    const [importData, setImportData] = useState([]);
    const [importHeadings, setImportHeadings] = useState([]);
    const [type, setType] = useState('');

    const setMessage = (value) => dispatch({type: 'SET_MESSAGE', payload: value});
    const importWebsites = (value) => dispatch({type: 'IMPORT_WEBSITES', payload: value});
    const importCategories = (value) => dispatch({type: 'IMPORT_CATEGORIES', payload: value});
    const importItems = (value) => dispatch({type: 'IMPORT_ITEMS', payload: value});
    const importAll = (obj) => {
        if (obj.websites !== undefined) importWebsites(obj.websites);
        if (obj.categories !== undefined) importCategories(obj.categories);
        if (obj.items !== undefined) importItems(obj.items);
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setType('');

        if (file === undefined) return;

        if (file.type.match('text/csv')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                let arr = [];
                let numbers = ['order', 'page', 'column'];

                let lines = reader.result.split('\n').map(line => line.split(','));

                let keys = lines[0].map(key => key.trim());
                setImportHeadings(keys);
                if (keys.includes('searchURL')) setType('Websites');
                else if (keys.includes('column')) setType('Categories');
                else return;

                for (let i = 1; i < lines.length; i++) {
                    let line = lines[i];
                    let obj = {};
                    line.forEach((a, i) => {
                        if (numbers.includes(keys[i])) obj[keys[i]] = parseInt(a);
                        else obj[keys[i]] = a;
                    });
                    arr.push(obj);
                }

                setImportData(arr);
            }

            reader.readAsText(file);	
        } else if (file.type.match('application/json')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setType('All');
                setImportHeadings(['id', 'name', 'order']);
                let text = reader.result;
                let obj = JSON.parse(text);

                let newObj = {};

                if (obj.items !== undefined) newObj.items = obj.items;
                if (obj.websites !== undefined) newObj.websites = obj.websites;
                if (obj.categories !== undefined) newObj.categories = obj.categories;
                
                setImportData(newObj);
            }

            reader.readAsText(file);
        }
    }

    const onImport = () => {
        if (type === 'Websites') importWebsites(importData);
        if (type === 'Categories') importCategories(importData);
        if (type === 'Items') importItems(importData);
        if (type === 'All') importAll(importData);

        setImportData({});
        setType('');
        setMessage({text: 'Import Complete', type: 'success'});
    }

    const downloadJson = () => {
        const backupObj = {items, categories, websites};
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));

        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `Food Order Backup - ${format(new Date(),'yyyy-MM-dd')}.json`);
        link.click();
    }

    return (
        <div>
            <Heading value='Backup'/>
            <p>This will download a full backup, including Websites, Categories and Items, in JSON format.</p>
            <Button value='Backup as JSON' onClick={downloadJson}/>
            <Heading value='Restore'/>
            <p>This will accept a JSON formatted file, which should be an object with 1-3 keys (websites, categories, items), each with an array of objects. This will overwrite the current data. Ideally this should be a backup that was downloaded from this app. If you create your own, make sure the format is correct otherwise it may cause issues.</p>
            <p>A CSV file will also be accepted for the Website and Categories, but not for Items. The following headings should be used:<br/>
            Categories: id, order, name, column, page.<br/>
            Websites: id, name, searchURL, forceDownload.</p>
            <input type='file' onChange={onFileChange}/>

            { importData.length > 0 && type.length > 0 ? <Button value={`Import ${type}`} onClick={onImport}/> : null }
            { Object.keys(importData).length > 0 && type.length > 0 ? <Button value={`Import Mulitple`} onClick={onImport}/> : null }

            { Array.isArray(importData) ? <Table style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        { importHeadings.map(heading => <td key={`import-heading-${heading}`}>{heading}</td>) }
                    </tr>
                </thead>
                <tbody>
                {
                    importData.map(obj => {
                        return <tr key={`import-data-${obj.id}`}>
                            {
                                importHeadings.map(heading => <td key={`import-data-${heading}-${obj.id}`}>{obj[heading]}</td>)
                            }
                        </tr>
                    })
                }
                </tbody>
            </Table> : null }
        </div>
    );
}

export default Backup;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../Components/Input';
import Heading from '../Components/Heading';
import Button from '../Components/Button';
import Table from '../Components/Table';

const Import = () => {
    const dispatch = useDispatch();
    
    const [importData, setImportData] = useState([]);
    const [importHeadings, setImportHeadings] = useState([]);
    const [type, setType] = useState('');

    const importWebsites = (value) => dispatch({type: 'IMPORT_WEBSITES', payload: value});
    const importCategories = (value) => dispatch({type: 'IMPORT_CATEGORIES', payload: value});

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setType('');

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
                else if (keys.includes('category')) setType('Items');

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
        }
    }

    const onImport = () => {
        if (type === 'Websites') importWebsites(importData);
        if (type === 'Categories') importCategories(importData);
    }

    return (
        <div>
            <Heading value="Import"/>

            <input type='file' onChange={onFileChange}/>

            <br/>
            <br/>

            { importData.length > 0 && type.length > 0 ? <Button value={`Import ${type}`} onClick={onImport}/> : null }

            <Table style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        {
                            importHeadings.map(heading => <td>{heading}</td>)
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    importData.map(obj => {
                        return <tr>
                            {
                                importHeadings.map(heading => <td>{obj[heading]}</td>)
                            }
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Import;
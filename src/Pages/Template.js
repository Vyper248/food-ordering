import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { PDFViewer } from '@react-pdf/renderer';

import { filterDeleted } from '../functions';

import TemplatePDF from '../Components/TemplatePDF';
import Heading from '../Components/Heading';

const splitArray = (array, perPage) => {
    let pages = [];
    let currentPage = [{name: 'name', size: 'size', qty: 'qty', note: 'note'}];
    for (let i = 0; i < array.length; i++) {
        currentPage.push(array[i]);
        if (currentPage.length === perPage || i === array.length-1) {
            pages.push(currentPage);
            currentPage = [];
        }
    }
    return pages;
}

const columnsToPages = (columns) => {
    let pages = [];
    columns.forEach(column => {
        column.forEach((page, i) => {
            if (pages[i] === undefined) pages[i] = [];
            pages[i].push(page);
        });
    });
    return pages;
}

const getEmptyRowFunction = () => {
    let id = 0;
    return () => {
        id++;
        //giving an object with a space for the name caused graphical glitch, so instead use a symbol with color :white
        return {name: '.', size: '', qty: '', note: '', id: 'empty-'+id, details: {}}
    };
}

function Template() {
    const items = useSelector(state => filterDeleted(state.items), shallowEqual);
    const categories = useSelector(state => filterDeleted(state.categories), shallowEqual);
    const website = useSelector(state => state.website);
    const getEmptyRow = getEmptyRowFunction();

    //for optimisation, so don't have to filter items for every category later
    let categoriesObj = {};
    [...items].sort((a,b) => a.order - b.order).forEach(item => {
        let category = item.category;
        let categoryObj = categories.find(obj => obj.id === category);
        if (categoryObj === undefined) return;
        if (categoriesObj[category] === undefined) categoriesObj[category] = [{title: categoryObj.name}];
        categoriesObj[category].push(item);
    });

    //organise items into page and column
    let dataObj = {};
    categories.forEach(category => {
        let page = category.page;
        let column = category.column;
        let itemArray = categoriesObj[category.id];
        if (itemArray === undefined) itemArray = [];
        if (dataObj[page] === undefined) dataObj[page] = {};
        if (dataObj[page][column] === undefined) dataObj[page][column] = [];
        dataObj[page][column].push(...itemArray);
        if (category.rowsAfter > 0) {
            for (let i = 0; i < category.rowsAfter; i++) {
                dataObj[page][column].push(getEmptyRow());
            }
        }
    });

    //split items that will span multiple pages into multiple arrays for better PDF formatting
    let allPages = [];
    Object.keys(dataObj).sort().forEach(page => {
        let columns = dataObj[page];
        let splitColumns = [];
        Object.keys(columns).sort().forEach(column => {
            let items = columns[column];
            let splitPages = splitArray(items, 33);
            splitColumns.push(splitPages);
        });
        let pages = columnsToPages(splitColumns);
        allPages.push(...pages);
    })

    //fill column arrays so that all columns are equal
    allPages.forEach(page => {
        let highest = Math.max(...page.map(arr => arr.length));
        page.forEach(itemsArray => {
            if (itemsArray.length < highest) {
                for (let i = itemsArray.length; i < highest; i++) {
                    itemsArray.push(getEmptyRow());
                }
            }
        });
    });

    return (
        <div id='templatePage'>
            <Heading value='Printable Template'/>
            <PDFViewer>
                <TemplatePDF data={allPages} website={website}/>
            </PDFViewer>
        </div>
    );
}

export default React.memo(Template);

import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

// Create styles
const styles = StyleSheet.create({
    table: {
        margin: 0,
        padding: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    }
});

const Table = ({children, data, page, column, website}) => {
    return (
        <View style={styles.table}>
        {
            data.map(item => {
                if (item.title !== undefined) return <TableHeader key={item.title} headings={[{text: item.title}]}/>;
                if (item.details === undefined) return <TableHeader key={`page-heading-${column}-${page}`} headings={[{text: 'Name', flex: 8}, {text: 'Size', flex: 5}, {text: 'Qty', flex: 2}, {text: 'Note', flex: 4}]}/>;
                let details = item.details[website];
                if (details === undefined) details = {size: '', note: ''}
                return <TableRow key={`data-${page}-${column}-${item.id}`} id={item.id} data={[
                    {text: item.name, flex: 8, key: 'name'},
                    {text: details.size, flex: 5, key: 'size'},
                    {text: '', flex: 2, key: 'qty'},
                    {text: details.note, flex: 4, key: 'note'}
                ]}/>
            })
        }
        </View>
    );
}

export default Table;
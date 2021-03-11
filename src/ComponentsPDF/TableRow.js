import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableRow: {
        marginTop: -1,
        flexDirection: 'row',
        display: 'flex',
    },
    tableCell: {
        marginLeft: -1,
        fontSize: 9,
        paddingTop: 3,
        paddingBottom: 2,
        paddingLeft: 3,
        border: '1pt solid black',
        textTransform: 'uppercase',
        backgroundColor: 'white'
    },
});

const TableRow = ({data=[], id=''}) => {
    return (
        <View style={styles.tableRow}>
        {
            data.map(obj => {
                let extraStyle = obj.text === '.' ? {color: 'white'} : {};
                return <Text key={'row-'+obj.key+id} style={[styles.tableCell, {flex: obj.flex ? obj.flex : 1}, extraStyle]}>{obj.text}</Text>
            })
        }
        </View>
    );
}

export default TableRow;
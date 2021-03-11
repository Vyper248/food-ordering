import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableHeader: {
        marginTop: -1,
        flexDirection: 'row',
        display: 'flex',
    },
    tableHead: {
        marginLeft: -1,
        fontSize: 9,
        paddingTop: 3,
        paddingBottom: 2,
        paddingLeft: 3,
        backgroundColor: '#BBB',
        fontFamily: 'Helvetica-Bold',
        border: '1pt solid black',
        textTransform: 'uppercase'
    }
});

const TableHeader = ({headings=[]}) => {
    return (
        <View style={styles.tableHeader}>
        {
            headings.map(obj => <Text key={'heading-'+obj.text} style={[styles.tableHead, {flex: obj.flex ? obj.flex : 1}]}>{obj.text}</Text>)
        }
        </View>
    );
}

export default TableHeader;
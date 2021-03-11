import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import Table from '../ComponentsPDF/Table';
import TableHeader from '../ComponentsPDF/TableHeader';
import TableRow from '../ComponentsPDF/TableRow';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 26,
    paddingBottom: 41
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1
  }
});

// Create Document Component
// data will be array of pages, which will be an array of columns, which will be an array of categories, which will be an object with title and array of items
const TemplatePDF = ({data=[], website=''}) => {
    return (
        <Document>
        {
            data.map((columns, page) => {
                return (
                    <Page key={'page-'+page} size="A4" orientation='Landscape' style={styles.page}>
                    {
                        columns.map((items, column) => <Table key={'column-'+column} style={styles.section} data={items} page={page} column={column} website={website}/>)
                    }
                    </Page>
                );
            })
        }
            
        </Document>
    );
}


export default TemplatePDF;
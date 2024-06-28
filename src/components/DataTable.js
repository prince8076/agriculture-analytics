import React from 'react';
import { Table } from '@mantine/core';

const DataTable = ({ data }) => {
    const tableStyles = {
        tableContainer: {
            marginTop: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            backgroundColor: '#f2f2f2',
            fontWeight: 'bold',
            padding: '10px',
            textAlign: 'left',
            border: '1px solid #ddd',
        },
        td: {
            padding: '10px',
            textAlign: 'left',
            border: '1px solid #ddd',
        },
    };

    console.log("Data passed to DataTable:", data);

    return (
        <div style={tableStyles.tableContainer}>
            <Table style={tableStyles.table} striped>
                <thead>
                    <tr>
                        <th style={tableStyles.th}>Year</th>
                        <th style={tableStyles.th}>Crop with Maximum Production in that Year</th>
                        <th style={tableStyles.th}>Crop with Minimum Production in that Year</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td style={tableStyles.td}>{row.year}</td>
                            <td style={tableStyles.td}>{row.maxCrop}</td>
                            <td style={tableStyles.td}>{row.minCrop}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;

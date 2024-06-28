import React from 'react';
import { Table } from '@mantine/core';

const CropAveragesTable = ({ averageData }) => {
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

    console.log("Average Data passed to CropAveragesTable:", averageData); // Debug log

    return (
        <div style={tableStyles.tableContainer}>
            <Table style={tableStyles.table} striped>
                <thead>
                    <tr>
                        <th style={tableStyles.th}>Crop</th>
                        <th style={tableStyles.th}>Average Yield of the Crop between 1950-2020</th>
                        <th style={tableStyles.th}>Average Cultivation Area of the Crop between 1950-2020</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(averageData).map((crop, index) => (
                        <tr key={index}>
                            <td style={tableStyles.td}>{crop}</td>
                            <td style={tableStyles.td}>{averageData[crop].averageYield.toFixed(2)}</td>
                            <td style={tableStyles.td}>{averageData[crop].averageArea.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CropAveragesTable;

import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { fetchData } from './utils/fetchData';
import DataTable from './components/DataTable';
import CropAveragesTable from './components/CropAveragesTable';

const App = () => {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [averageData, setAverageData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { aggregatedData, averageData } = await fetchData();
      console.log("Aggregated data fetched in App component:", aggregatedData);
      console.log("Average data fetched in App component:", averageData);
      setAggregatedData(aggregatedData);
      setAverageData(averageData);
    };
    getData();
  }, []);

  return (
    <Container>
      <h1>Agriculture Analytics</h1>
      <h2>Crops with Maximum and Minimum Production</h2>
      <DataTable data={aggregatedData} />
      <h2>Average Yield and Cultivation Area of Crops between 1950-2020</h2>
      <CropAveragesTable averageData={averageData} />
    </Container>
  );
};

export default App;

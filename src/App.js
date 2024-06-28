import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { fetchData } from './utils/fetchData';
import DataTable from './components/DataTable';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      console.log("Data fetched in App component:", result); // Debug log
      setData(result);
    };
    getData();
  }, []);

  return (
    <Container>
      <h1>Agriculture Analytics</h1>
      <DataTable data={data} />
    </Container>
  );
};

export default App;

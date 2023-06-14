import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //states are important in all FE programming to know the state of the page.
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://ZiptasticAPI.com/73013');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
     <h1>Ariana's Interactive Map Client</h1>
     {data && (
        <div>
          <h2>Zip Code: {data.zip}</h2>
          <p>City: {data.city}</p>
          <p>State: {data.state}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';



// States are important in all FE programming to know the state of the page.
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [zipCode, setZipCode] = useState('95401');
  const [hasFetched, setHasFetched] = useState(false);
  


// Create the input element in JS
const input = document.createElement('input');
input.type = 'number';
input.id = 'userZip';
input.placeholder = 'Enter a 5-digit zip code';

// Add the input element, 'input', to the DOM
const container = document.getElementById('container');
//container.appendChild(input);

// Append the input element to the container

  

//useEffect allows the webpage to be updated dynamically based on data input.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`http://ZiptasticAPI.com/${zipCode}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

   if (hasFetched === false) {
      fetchData();
      setHasFetched(true);
   }
  }, [zipCode, hasFetched]);
  
  const onChange = (event) => {
    console.log('Event', event.target.value); 
    setZipCode(event.target.value);
  }

  const onClick = () => {
    setHasFetched(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
     <h1>Zip code identifier</h1>
     {data && (
        <div className="global-style">
          <br></br>
          <input onChange={onChange} type="string" id="userZipInput" placeholder="Enter your zipcode"/>
          <br></br>
          <br></br><button className="custom-button" onClick={onClick} type='button'>
            
            Submit
            </button>
            <h2>Zip Code: {zipCode}</h2>
          <p>City: {data.city}</p>
          <p>State: {data.state}</p>
        </div>
      )}
    </div>
  );
}

export default App;

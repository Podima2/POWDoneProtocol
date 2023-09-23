import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  // *** Run fetchCounter once when the app is started ***
  React.useEffect(() => {
    fetchCounter();
  }, []);
  

  const fetchCounter = async () => {
    try {
      const response = await fetch('https://api2.powdone.com/counter');
      const res = await response.json();
      setCounter(res.counter);
    } catch (error) {
      console.error('Error fetching counter', error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch('https://api2.powdone.com/counter/add');
    } catch (error) {
      console.error('Error adding to counter', error);
    }
    fetchCounter();
  };

  const handleMinus = async () => {
    try {
      await fetch('https://api2.powdone.com/counter/minus');
    } catch (error) {
      console.error('Error subtracting from counter', error);
    }
    fetchCounter();
  };

  return (
    <div className="app">
      <header className="app-header">
        <p>Counter: {counter}</p>
      </header>
      <button className="add-button" onClick={handleAdd}>PLUS</button>
      <button className="minus-button" onClick={handleMinus}>MINUS</button>
    </div>
  );
}

export default App;

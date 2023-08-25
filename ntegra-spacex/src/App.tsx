import React from 'react';
import { getLaunchData} from './ApiCalls';
import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [name, setName] = useState('');
  const [launchData, setLaunchData] = useState('');
  const [rocketID, setRocketID] = useState('');
  const [details, setDetails] = useState('');

  const getData = async () => {
    const response = await getLaunchData()
    
  }

  useEffect(() => {
     getData()
  }, [])
 
 
  return (
    <div className="App">
    
    </div>
  );
}


export default App;

import React from 'react';
import './styling/App.css';
import MainTable from './components/MainTable/MainTable'
import Header from './components/Header/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const App: React.FC = () => {

  return (
    <div className="App">
      <Header/>
       <CssBaseline />
      <Container maxWidth ="lg">
       
        <MainTable/>
      </Container>
    </div>
  );
}


export default App;

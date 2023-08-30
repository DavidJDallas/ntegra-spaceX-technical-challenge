import React from 'react';
import './styling/App.css';
import MainTable from './components/MainTable/MainTable'
import Header from './components/Header/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LaunchDetails from './components/LaunchDetails/LaunchDetails'

const App: React.FC = (): JSX.Element => {

  return (
    <div className="App">
      <Header/>
      <CssBaseline />
      <Container maxWidth ="lg"> 
      <Routes>
         <Route  path='/' element={<MainTable/>}>

         </Route>
          <Route path='/:launchName' element={<LaunchDetails/>}>            
        </Route>          
          
      </Routes>      
       
      </Container>
    </div>
  );
}


export default App;

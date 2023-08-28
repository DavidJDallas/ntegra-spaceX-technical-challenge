import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getLaunchData } from '../ApiCalls';
import {useState, useEffect} from 'react';
import '../styling/Table.css'
import { FilteredLaunchData } from '../types/APICallTypes';
import ModalComponent from './Modal';

const MainTable = () => {

  const initialLaunchData: FilteredLaunchData = {
    name: '',
    success: false,
    launchpadID: '',
    details: '',
    launchDate: '',
    rocketID: '',  
  };

  const [responseData, setResponseData] = useState<FilteredLaunchData[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [specificLaunchData, setSpecificLaunchData] = useState<FilteredLaunchData>(initialLaunchData);

 
  
  //If time, add local storage boolean to indicate whether API has been called. 

  //the apiCallMade state is implemented to stop the spaceX API being called frequently. For the purposes of this app, the data just needs to be accessed once, stored in state, and that is it. The data from the spaceX api is not being updated frequently enough that it would require constant calls from this app, and making constant calls will impact performance of the app. Although basically neglible at this sclae, it would become noticeable if the app was scaled upwards. The API call is therefore made once, when the app is initially loaded and refreshed.

  const getDataFromAPICall = async (): Promise<void> => {
    try{
      const responseData: FilteredLaunchData[] = await getLaunchData();
        if(responseData.length>0){         
          setResponseData(responseData);          
        }  
    }catch(error: any){
        throw new Error(error)
    }    
  }

  useEffect((): void => {
    getDataFromAPICall()
  }, [])

  const handleOpenModal = () :void => {
    setOpenModal(true);
  }

  const handleCloseModal = () :void => {
    setOpenModal(false);
  }

  const handleSelectData = (row: FilteredLaunchData):void => {
    setSpecificLaunchData(row);
    handleOpenModal();
  }

    return(<>
    <h1>Launch Data</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='column-title' >Name</TableCell>           
            <TableCell className='column-title' align="right">Launch Date</TableCell>
            <TableCell className='column-title' align="right">Rocket ID</TableCell>
            <TableCell className='column-title' align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row) => (
            <TableRow              
              key={row.name}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                onClick = {() => handleSelectData(row)}
                component="th" scope="row">
                  {row.name}
              </TableCell>
              <TableCell 
                onClick = {() => handleSelectData(row)}
                align="right">
                  {row.launchDate}
              </TableCell>
              <TableCell 
                onClick = {() => handleSelectData(row)}
                align="right">
                  {row.rocketID}
              </TableCell>
              
              <TableCell align="left">{row.details}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <ModalComponent
              openModal={openModal}
              handleClose={handleCloseModal}          
              specificLaunchData = {specificLaunchData}
            />
    </>)
}

export default MainTable
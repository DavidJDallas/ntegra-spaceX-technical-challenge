import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,Box, TablePagination} from '@mui/material';
import { getLaunchData } from '../../services/APICalls/ApiCalls';
import {useState, useEffect} from 'react';
import '../../styling/Table.css';
import { FilteredLaunchData } from '../../services/APICalls/APICallTypes';
import ModalComponent from './Modal';


const MainTable: React.FC = (): JSX.Element => {

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0); 

  //Stored as a variable rather than in state as it's not being updated and remains constant. 
  const rowsPerPage = 10


  const getDataFromAPICall = async (): Promise<void> => {
    try{
      setIsLoading(true);
      const responseData: FilteredLaunchData[] = await getLaunchData();
        if(responseData.length>0){         
          setResponseData(responseData);
          setIsLoading(false)          
        }  
    }catch(error: any){
        setIsLoading(false);
        throw new Error(error);
    }    
  }

  useEffect((): void => {
    getDataFromAPICall();
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

  if(isLoading){
    return(
      <>    
      <h1>Launch Data</h1>
        <div className='spinner'>
          <Box >
            <CircularProgress />
            <p>Loading content...</p>
          </Box>   
        </div>        
      </>
    )
  }

  return(<>
    <h1>Launch Data</h1>
    <h3>To find a specific launch, please enter the name of the launch in the url. For instance, to find specific details on AsiaSat 8, use [domainname]/asiasat 8</h3>
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
          {responseData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow              
              key={row.name}              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell                
                onClick = {() => handleSelectData(row)}
                className='table-cell'
                component="th" scope="row">
                 
                  {row.name}
              </TableCell>
              <TableCell 
                className='table-cell'
                onClick = {() => handleSelectData(row)}
                align="right">
                  {row.launchDate}
              </TableCell>
              <TableCell 
                className='table-cell'
                onClick = {() => handleSelectData(row)}
                align="right">
                  {row.rocketID}
              </TableCell>              
              <TableCell 
              className='table-cell'
              onClick = {() => handleSelectData(row)}
              align="left">{row.details}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      count={responseData.length}
      page={page}
      onPageChange={(event, newPage) => setPage(newPage)}
      rowsPerPage={rowsPerPage}      
    />
    <ModalComponent
         openModal={openModal}
         handleClose={handleCloseModal}          
         specificLaunchData = {specificLaunchData}
      />
    </>)
}

export default MainTable
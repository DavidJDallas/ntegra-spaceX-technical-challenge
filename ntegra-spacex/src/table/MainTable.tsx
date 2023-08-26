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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const MainTable: React.FC = () => {

  const [name, setName] = useState<string[]>([]);
  const [launchDate, setLaunchDate] = useState<string[]>([]);
  const [rocketID, setRocketID] = useState<string[]>([]);
  const [details, setDetails] = useState<string[]>([]);
  const [launchPadID, setLaunchPadID] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean[]>([]); 
  const [responseData, setResponseData] = useState<FilteredLaunchData[]>([])

  const getDataFromAPICall = async () => {

    try{
      const responseData: FilteredLaunchData[] | Error = await getLaunchData();
        console.log(responseData);
        if(responseData.length>0){
          setResponseData(responseData)
          let arrayOfNames = responseData.map((element: FilteredLaunchData) => (element.name))
        console.log(arrayOfNames)      
          setName(arrayOfNames)
      }
  
    }catch(error){
      
    }

   

    
  }

  useEffect(() => {
     getDataFromAPICall()
  }, [])

    return(<>
    <h1>Launch Data</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='column-title'>Name</TableCell>           
            <TableCell className='column-title' align="right">Launch Date</TableCell>
            <TableCell className='column-title' align="right">Rocket ID</TableCell>
            <TableCell className='column-title' align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.launchDate}</TableCell>
              <TableCell align="right">{row.rocketID}</TableCell>
              <TableCell align="right">{row.details}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>)
}

export default MainTable
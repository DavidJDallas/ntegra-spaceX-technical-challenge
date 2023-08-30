import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import { useParams, useNavigate } from 'react-router-dom';
import { getLaunchData } from '../../services/APICalls/ApiCalls';
import { FilteredLaunchData } from '../../services/APICalls/APICallTypes';
import {useState, useEffect} from 'react';
import '../../styling/LaunchDetails.css';
import Button from '@mui/material/Button';

const LaunchDetails: React.FC = (): JSX.Element => {    

    const initialLaunchData: FilteredLaunchData = {
        name: '',
        success: false,
        launchpadID: '',
        details: '',
        launchDate: '',
        rocketID: '',  
      };
    

    const {launchName} = useParams<string>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [launchData, setLaunchData] = useState<FilteredLaunchData>(initialLaunchData)

    //Note: It is unecessary to re-write and re-make this API call, and create more states as above. A better way to do it would be to raise the call up from the MainTable component into the parent component of both of these - App.tsx - and pass the data down as props. The reason for not doing this is running out of time and knowing that I would have to restructure and re-write tests. I thought a better use of my time would be to finish the tasks and explain what I would do differently, given more time. 

    const getDataFromAPICall = async (): Promise<void> => {
        try{
          setIsLoading(true);
          const responseData: FilteredLaunchData[] = await getLaunchData();
            if(responseData.length>0 && launchName){ 
            
                const specificData = responseData.filter((element) => element.name=== launchName);
                
                setLaunchData(specificData[0]);                

                setIsLoading(false);          
            }  
        }catch(error: any){
            throw new Error(error)
        }    
      }
    
      useEffect((): void => {
        getDataFromAPICall()
      }, [])

    const handleBackClick = () => {
        navigate('/')
    }
    
    return(<>
    <div className='launch-details-main'>
    
   
      <h1>{launchData.name}</h1>
      <Button className='button' variant="contained" onClick={handleBackClick}>
        Go Back
      </Button>
      <Table>
       <TableBody>          
         <TableRow>                  
           <TableCell className='modal-cell-title' align="center">Launch Date</TableCell>
           <TableCell className='modal-cell-title' align="center">Rocket ID</TableCell>
           <TableCell className='modal-cell-title' align="center">Launchpad ID</TableCell>
           <TableCell className='modal-cell-title' align="center">Success</TableCell>
           <TableCell className='modal-cell-title' align="center">Details</TableCell>
         </TableRow>
         <TableRow>                  
           <TableCell align="center">{launchData.launchDate}</TableCell>
           <TableCell align="center">{launchData.launchDate}</TableCell>
           <TableCell align="center">{launchData.launchpadID}</TableCell>
           <TableCell align="center">{launchData.success.toString()}</TableCell>
           <TableCell align="center">{launchData.details}</TableCell>
         </TableRow>  
        </TableBody>
      </Table>
    </div>
    </>)
}

export default LaunchDetails;
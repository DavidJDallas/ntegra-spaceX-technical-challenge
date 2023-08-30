import * as React from 'react';
import {TableCell, TableRow, Table, Box, TableBody, CircularProgress, Button} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getLaunchData } from '../../services/APICalls/ApiCalls';
import { FilteredLaunchData } from '../../services/APICalls/APICallTypes';
import {useState, useEffect} from 'react';
import '../../styling/LaunchDetails.css';


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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [launchData, setLaunchData] = useState<FilteredLaunchData>(initialLaunchData);
    
    //NOTE: Ideally, the unique url identifier would be a specific unique ID that is different to the name. However, the API seems to be faulty in that it returns multiple non-unique IDs for both rockets and launchpads. The API has a seperate endpoint for rockets and launchpads which seems to provide the correct ID, but I realised the error with not enough time to set up 2 new API calls and re-configure the table and this component. Alternatively I've formatted the names to make it work. 

    //NOTE: It is unecessary to re-write and re-make this function call below, and create more states as above. A better way to do it would be to raise the call up from the MainTable component into the parent component of both of these - App.tsx - and pass the data down as props. The reason for not doing this is running out of time and knowing that I would have to restructure and re-write tests. I thought a better use of my time would be to finish the tasks and explain what I would do differently, given more time. 

    const getDataFromAPICall = async (): Promise<void> => {
        try{
          setIsLoading(true);
          const responseData: FilteredLaunchData[] = await getLaunchData();
            if(responseData.length>0 && launchName){ 
             
                const specificData = responseData.filter((element) => {                  
                    return element.name.toLowerCase() === launchName.toLowerCase()                 
                  }
                );                
                setLaunchData(specificData[0]);
                setIsLoading(false);          
            }  
        } catch(error: any){
            setIsLoading(false)
            throw new Error(error)
        }    
      }
    
    useEffect((): void => {
        getDataFromAPICall()
      }, [])

    const handleBackClick = (): void => {
        navigate('/')
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
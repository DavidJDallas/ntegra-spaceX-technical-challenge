import {render, screen, act, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import '@testing-library/jest-dom'
import {getLaunchData} from '../../services/APICalls/ApiCalls';
import LaunchDetails from './LaunchDetails';
import * as APICallsModule from '../../services/APICalls/ApiCalls'
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';


//NB this test fails as it doesn't properly render the desired data here. I couldn't work out how to get this passing before the time constaint was up. I thought it was better, though, to leave this in failing as opposed to removing it and have all the tests passing to give you a better insight into what I was trying and to give you a more accurrate picture of the process. 

it("Renders the data for the specific launch", async () => {
  
    jest.mock('../../services/APICalls/ApiCalls');

    const mockData = [
      {
        name: "FalconSat",
        success: false,
        launchpadID: "5e9e4502f5090995de566f86",
        details:  "Engine failure at 33 seconds and loss of vehicle",
        launchDate:   "2006-03-24T22:30:00.000Z".slice(0,10),
        rocketID: "5e9d0d95eda69955f709d1eb"
      }
    ]

    jest.spyOn(APICallsModule, 'getLaunchData').mockResolvedValue(mockData);


    await act(async () => {
         render(      
       <MemoryRouter initialEntries={['/falconsat']}>   
       <Routes>
        <Route path='/:launchname' element={<LaunchDetails/>}>
        
          </Route>  
         </Routes>       
        </MemoryRouter>       
       );
    })


    const topColumnLaunchDate = screen.getByText('Launch Date');
    const topColumnDetails = screen.getByText('Details');
    const topColumnRocketID = screen.getByText('Rocket ID');
    const topColumnSuccess = screen.getByText('Success');
    const topColumnLaunchpadID = screen.getByText('Launchpad ID'); 
    const button = screen.getByText('Go Back') 

    const cellColumnName = await screen.findByText('FalconSat');
    const cellColumnDate = await screen.findByText('2006-03-24');
    const cellColumnRocketID = await screen.findByText('5e9d0d95eda69955f709d1eb');
    const cellColumnLaunchpadID = await screen.findByText('5e9e4502f5090995de566f86');
    const cellColumnSuccess = await screen.findByText('false');
    const cellColumnDetails = await screen.findByText('Engine failure at 33 seconds and loss of vehicle');

    expect(topColumnLaunchDate).toBeInTheDocument();
    expect(topColumnDetails).toBeInTheDocument();
    expect(topColumnRocketID).toBeInTheDocument();
    expect(topColumnLaunchpadID).toBeInTheDocument();
    expect(topColumnSuccess).toBeInTheDocument();
    expect(button).toBeInTheDocument(); 

    expect(cellColumnName).toBeInTheDocument();
    expect(cellColumnDate).toBeInTheDocument();
    expect(cellColumnRocketID).toBeInTheDocument();
    expect(cellColumnLaunchpadID).toBeInTheDocument();
    expect(cellColumnSuccess).toBeInTheDocument();
    expect(cellColumnDetails).toBeInTheDocument();
    

  


    })
    
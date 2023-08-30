import {render, screen, act, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import {getLaunchData} from '../../services/APICalls/ApiCalls';
import LaunchDetails from './LaunchDetails';
import * as APICallsModule from '../../services/APICalls/ApiCalls'
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';



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
       <BrowserRouter>
       <LaunchDetails/>
       </BrowserRouter>
       
       );
    })


    const topColumnLaunchDate = screen.getByText('Launch Date');
    const topColumnDetails = screen.getByText('Details');
    const topColumnRocketID = screen.getByText('Rocket ID');
    const topColumnSuccess = screen.getByText('Success');
    const topColumnLaunchpadID = screen.getByText('Launchpad ID');  
    
    const cellColumnLaunchDate = await screen.findByText('2006-03-24');
    const cellColumnDetails = await screen.findByText('Engine failure at 33 seconds and loss of vehicle');
    const cellColumnRocketID = await screen.findByText('5e9d0d95eda69955f709d1eb');
    

    expect(topColumnLaunchDate).toBeInTheDocument();
    expect(topColumnDetails).toBeInTheDocument();
    expect(topColumnRocketID).toBeInTheDocument();
    expect(topColumnLaunchpadID).toBeInTheDocument();
    expect(topColumnSuccess).toBeInTheDocument();

    expect(cellColumnLaunchDate).toBeInTheDocument();
    expect(cellColumnDetails).toBeInTheDocument();
    expect(cellColumnRocketID).toBeInTheDocument();
  })
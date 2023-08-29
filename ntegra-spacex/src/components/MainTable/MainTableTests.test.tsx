import {render, waitFor, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import {getLaunchData} from '../../services/APICalls/ApiCalls';
import MainTable from '../../components/MainTable/MainTable';
import * as APICallsModule from '../../services/APICalls/ApiCalls'
import { FilteredLaunchData } from '../../services/APICalls/APICallTypes';
import * as React from 'react';



describe("Main Table component", () => {

    it("Renders the table correctly", async () => {
  
      jest.mock('../../services/APICalls/ApiCalls');
  
      const mockData = [
        {
          name: "falconSat",
          success: false,
          launchpadID: "5e9e4502f5090995de566f86",
          details:  "Engine failure at 33 seconds and loss of vehicle",
          launchDate:   "2006-03-24T22:30:00.000Z".slice(0,10),
          rocketID: "5e9d0d95eda69955f709d1eb"
        }
      ]
  
      jest.spyOn(APICallsModule, 'getLaunchData').mockResolvedValue(mockData);
  
      await act(async () => {
         render(<MainTable/>);
      })
  
  
      const topColumnName = screen.getByText('Name');
      const topColumnLaunchDate = screen.getByText('Launch Date');
      const topColumnDetails = screen.getByText('Details');
      const topColumnRocketID = screen.getByText('Rocket ID');  
      
      const cellColumnName = await screen.findByText('falconSat');
      const cellColumnLaunchDate = await screen.findByText('2006-03-24');
      const cellColumnDetails = await screen.findByText('Engine failure at 33 seconds and loss of vehicle');
      const cellColumnRocketID = await screen.findByText('5e9d0d95eda69955f709d1eb');
  
      expect(topColumnName).toBeInTheDocument();
      expect(topColumnLaunchDate).toBeInTheDocument();
      expect(topColumnDetails).toBeInTheDocument();
      expect(topColumnRocketID).toBeInTheDocument();
  
      expect(cellColumnName).toBeInTheDocument();
      expect(cellColumnLaunchDate).toBeInTheDocument();
      expect(cellColumnDetails).toBeInTheDocument();
      expect(cellColumnRocketID).toBeInTheDocument();
    }),
    it("Throws an error if there is something wrong with the data", async () => {
      
      // jest.mock('../ApiCalls');
  
      // const mockData: Error = new Error('API error')
      
      // jest.spyOn(APICallsModule, 'getLaunchData').mockResolvedValue(mockData);
  
      // await act(async () => {
      //   render(<MainTable/>);
    //  })
  
    })
    
    it("Loads the modal when the user clicks on a column cell", async() => {
  
        jest.mock('../../services/APICalls/ApiCalls');
  
      const mockData = [
        {
          name: "falconSat",
          success: false,
          launchpadID: "5e9e4502f5090995de566f86",
          details:  "Engine failure at 33 seconds and loss of vehicle",
          launchDate:   "2006-03-24T22:30:00.000Z".slice(0,10),
          rocketID: "5e9d0d95eda69955f709d1eb"
        }
      ]
  
      jest.spyOn(APICallsModule, 'getLaunchData').mockResolvedValue(mockData);
  
      await act(async () => {
         render(<MainTable/>);
      })
  
  
      //
    })  
   
  })
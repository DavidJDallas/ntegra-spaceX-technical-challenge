import {render, screen, act, fireEvent} from '@testing-library/react';
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
    
    it("Loads the modal and passed through the correct information to the modal when the user clicks on the name column cell", async() => {
  
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
      
      const cellColumnName = await screen.findByText('falconSat');     

      fireEvent.click(cellColumnName);

       //Below are the two pieces of data that aren't on the page unless the modal is present. Hence, if they are found, the modal has been activated successfully.       
      const modalColumnSuccess = await screen.findByText('false')
      const modalColumnLaunchpadID = await screen.findByText('5e9e4502f5090995de566f86')

      expect(modalColumnSuccess).toBeInTheDocument();
      expect(modalColumnLaunchpadID).toBeInTheDocument();
  
      //
    }),
     
    it("Loads the modal and passes through the correct information to the modal when the user clicks on the Launch Date column cell", async() => {
  
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
      
      const cellColumnLaunchDate = await screen.findByText('2006-03-24');     

      fireEvent.click(cellColumnLaunchDate);
      
      //Below are the two pieces of data that aren't on the page unless the modal is present. Hence, if they are found, the modal has been activated successfully. 
      const modalColumnSuccess = await screen.findByText('false')
      const modalColumnLaunchpadID = await screen.findByText('5e9e4502f5090995de566f86')

      expect(modalColumnSuccess).toBeInTheDocument();
      expect(modalColumnLaunchpadID).toBeInTheDocument();
  
      //
    }),
    it("Loads the modal and passes through the correct information to the modal when the user clicks on the Rocket ID column cell", async() => {
  
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
      
      const cellColumnLaunchDate = await screen.findByText("5e9d0d95eda69955f709d1eb");     

      fireEvent.click(cellColumnLaunchDate);
      
      //Below are the two pieces of data that aren't on the page unless the modal is present. Hence, if they are found, the modal has been activated successfully. 
      const modalColumnSuccess = await screen.findByText('false')
      const modalColumnLaunchpadID = await screen.findByText('5e9e4502f5090995de566f86')

      expect(modalColumnSuccess).toBeInTheDocument();
      expect(modalColumnLaunchpadID).toBeInTheDocument();
  
      //
    }),
    it("Loads the modal and passes through the correct information to the modal when the user clicks on the Details column cell", async() => {
  
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
      
      const cellColumnDetails = await screen.findByText('Engine failure at 33 seconds and loss of vehicle');     

      fireEvent.click(cellColumnDetails);
      
      //Below are the two pieces of data that aren't on the page unless the modal is present. Hence, if they are found, the modal has been activated successfully. 
      const modalColumnSuccess = await screen.findByText('false')
      const modalColumnLaunchpadID = await screen.findByText('5e9e4502f5090995de566f86')

      expect(modalColumnSuccess).toBeInTheDocument();
      expect(modalColumnLaunchpadID).toBeInTheDocument();
  
      
    })
   
   
  })
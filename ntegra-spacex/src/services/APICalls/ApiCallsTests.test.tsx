import axios from 'axios';
import {render, waitFor, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import {getLaunchData} from './ApiCalls';
import * as APICallsModule from './ApiCalls'
import { FilteredLaunchData } from './APICallTypes';
import * as React from 'react';

describe('getLaunchData spaceX API call', () => {
    //All we need to do is to assert that we call the axios get function, and that we return the API response. 
  
    //Mocks are introduced for a few reasons:
    //(1) We're not responsible for external APIs code or runnability; we're testing our code and not theirs.
    //(2) Testing external APIs slows the testing down since we are making external network calls. This will be neglible in projects like this but become more significant when working on larger scale projects.  
    jest.mock('axios');
  
    it("Sucessfully calls axios and return the correct response", async () => {  
      const mockData = {      
          data: [{
            name: "falconSat",
            success: false,
            launchpad: "5e9e4502f5090995de566f86",
            details: "Engine failure at 33 seconds and loss of vehicle",
            date_utc: "2006-03-24T22:30:00.000Z",
            rocket: "5e9d0d95eda69955f709d1eb"     
        }]
      };
  
      const mockResponse =   
      [{
        name: "falconSat",
        success: false,
        launchpadID: "5e9e4502f5090995de566f86",
        details:  "Engine failure at 33 seconds and loss of vehicle",
        launchDate:   "2006-03-24T22:30:00.000Z".slice(0,10),
        rocketID: "5e9d0d95eda69955f709d1eb"
        },
      ];
  
      axios.get = jest
        .fn()
        .mockResolvedValue(mockData);
  
      const response = await getLaunchData();    
      
      expect(response).toEqual(mockResponse); 
      
  
    })
    it("Throws an error if there is an error returned from the API", async () => {
      axios.get = jest
        .fn()
        .mockRejectedValue(new Error("Incorrect address"))
  
      await expect(getLaunchData()).rejects.toThrowError("Incorrect address"); 
  
    })
  })
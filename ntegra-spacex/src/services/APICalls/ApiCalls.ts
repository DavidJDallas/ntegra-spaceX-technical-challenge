import axios from 'axios';
import {FilteredLaunchData, LaunchData, LaunchesAPICall} from './APICallTypes';

export const getLaunchData = async (): Promise<FilteredLaunchData[]> => {
    try{
        const launchData: LaunchesAPICall = await axios.get('https://api.spacexdata.com/v5/launches/');   
        
        //Data is below formatted to make the returning array of objects specific to user and stakeholder requirements. This makes things easier to work with and eliminates surplus data. It will also marginally improve perfomance speed, since the subsequent objects now being passed around contain less data. But at this scale the difference would probably be negligible and the motivation is primarily for the first reason.

        const filteredLaunchData: FilteredLaunchData[] = launchData.data.map((element: LaunchData) => ({            
            name: element.name,
            success: element.success,
            launchpadID: element.launchpad,
            details: element.details,
            launchDate: element.date_utc.slice(0,10),
            rocketID: element.rocket
        }))
        
        return filteredLaunchData;
        
    } catch(error: any){     
        throw new Error(error);       
    }
}


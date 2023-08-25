import axios from 'axios';

//name
//launch data
//rocket ID
// details

export const getLaunchData = async () => {
    try{
        const generalData = await axios.get('https://api.spacexdata.com/v5/launches/');
        console.log(generalData);
        return generalData;
    } catch(err){

    }
}


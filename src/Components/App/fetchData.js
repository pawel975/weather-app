import axios from "axios";

export const fetchData = async (url) => {

    try {
        const response = await axios.get(url);
        const data = await response.data;
        return data;
        
    }
    catch (error) {
        return console.error(`You have an error! - ${error}`);

    }

}



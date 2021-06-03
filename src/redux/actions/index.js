

export const open = () => {
    return {
        type: "OPEN",
    }
} 

export const close = () => {
    return {
        type: "CLOSE",
    }
} 

export const getData = (weatherData) => {
    return {
        type: "GET_DATA",
        payload: weatherData
    }
} 
export const setDataLoading = (isLoading) => {
    return {
        type: "DATA_LOADING",
        payload: isLoading,
    }
} 
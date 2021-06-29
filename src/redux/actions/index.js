

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

export const setModalDetailsIndex = (index) => {
    return {
        type: "MODAL_DETAILS_INDEX",
        payload: index,
    }
}

export const modalDetailsOpen = () => {
    return {
        type: "MODAL_DETAILS_OPEN"
    }
}

export const modalDetailsClose = () => {
    return {
        type: "MODAL_DETAILS_CLOSE"
    }
}



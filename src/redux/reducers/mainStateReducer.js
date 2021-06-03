
const initialState = {
    data: [],
    isDataLoading: true,
}


const mainStateReducer = (state = initialState ,action) => {
    switch(action.type) {
        case "GET_DATA":
            return {
                ...state,
                data: [action.payload]
            }
        case "DATA_LOADING":
            return {
                ...state,
                isDataLoading: action.payload
            }
        default:
            return state;
    }
}

export default mainStateReducer;
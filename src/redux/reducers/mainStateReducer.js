
const initialState = {
    data: [],
    isDataLoading: true,
    modalDetailsIndex: {
        index:1,
        category: "hours",
    },
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
        case "MODAL_DETAILS_INDEX":
            return {
                ...state,
                modalDetailsIndex: action.payload
            }
        default:
            return state;
    }
}

export default mainStateReducer;
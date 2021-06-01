
const initialState = {
    data: []
}


const mainStateReducer = (state = initialState ,action) => {
    switch(action.type) {
        case "GET_DATA":
            return {
                data: [action.payload]
            }
        default:
            return state;
    }
}

export default mainStateReducer;
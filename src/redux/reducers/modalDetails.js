
const modalDetails = (state = false, action) => {
    switch(action.type) {
        case "MODAL_DETAILS_OPEN":
            return state = true;
        case "MODAL_DETAILS_CLOSE":
            return state = false;
        default:
            return state;
    }
}

export default modalDetails;
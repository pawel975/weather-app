import isFilterSectionOpen from './isFilterSectionOpen';
import mainStateReducer from './mainStateReducer';
import modalDetails from './modalDetails';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isFilterSectionOpen,
    mainStateReducer,
    modalDetails,
})

export default allReducers;
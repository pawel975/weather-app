import isFilterSectionOpen from './isFilterSectionOpen';
import mainStateReducer from './mainStateReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isFilterSectionOpen,
    mainStateReducer,
})

export default allReducers;
import React from 'react';
import { useSelector } from 'react-redux';
import CurrentDayDetails from '../CurrentDayDetails/CurrentDayDetails';
import Quote from '../Quote/Quote';
import './Main.css'
// import TestColorComponent from './TestColorComponent';

const Main = ({weatherIcon}) => {

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);

    return(
            // <TestColorComponent/>
        <div className="main">

            <div className="main__weather-icon">
                <img src={weatherIcon} alt="weather-icon"/>
            </div>
            <CurrentDayDetails/>
            {!isFilterSectionOpen && <Quote/>}
        </div>
                
    )
}

export default Main;
import React from 'react';
import CurrentDayDetails from '../CurrentDayDetails/CurrentDayDetails';
import Quote from '../Quote/Quote';
import './Main.scss'
const Main = ({weatherIcon}) => {

    return(
        <div className="main">
            <div className="main__weather-icon">
                <img src={weatherIcon} alt="weather-icon"/>
            </div>
            <CurrentDayDetails/>
            <Quote/>
        </div>
                
    )
}

export default Main;
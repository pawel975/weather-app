import './Welcome.css';
import React from 'react';
import { formatToDate } from '../global-helpers/formatToDate';


const Welcome = () => {

    let date = new Date().getTime()/1000;

    return(
        <div className="Welcome">
            <div className="Welcome__date">
                {`Hello, it's ${formatToDate(date, "dayOfTheWeek")}, ${formatToDate(date, 'day-month')}`}
            </div>
        </div>
    )
}

export default Welcome;
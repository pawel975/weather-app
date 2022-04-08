import './Welcome.scss';
import React from 'react';
import { formatToDate } from '../global-helpers/formatToDate';


const Welcome = () => {

    let date = new Date().getTime()/1000;

    return(
        <div className="welcome">
            <div className="welcome__date">
                {`Hello, it's ${formatToDate(date, "dayOfTheWeek")}, ${formatToDate(date, 'day-month')}`}
            </div>
        </div>
    )
}

export default Welcome;
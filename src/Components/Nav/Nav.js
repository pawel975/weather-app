import './Nav.css';
import React from 'react';


const Nav = ({formatToDate}) => {

    let date = new Date().getTime()/1000;

    return(
        <div className="nav">
            <div className="nav__date">{`Hello, it's ${formatToDate(date, "dayOfTheWeek")}, ${formatToDate(date, 'day-month')}`}</div>
        </div>
    )
}

export default Nav;
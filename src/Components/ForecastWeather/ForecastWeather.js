import React from 'react';

const ForecastWeather = () => {

    const testArray = [1,2,3,4,5,6,7,8];

    const allDays = testArray.map((day) => (
        <section key={day} className="weather__day">
            <p className="weather__date">Date 12.12.12</p>
            <img className="weather__weather-icon" src="" alt="" />cloud
            <p className="weather__temperature">26*C / 15*C</p>
        </section>
    ))

    return(
        <div className="weather">
            {allDays}
        </div>
    )
}

export default ForecastWeather;
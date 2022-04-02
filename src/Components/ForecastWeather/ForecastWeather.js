import React from 'react';
import './ForecastWeather.css'; 

import { useSelector, useDispatch } from 'react-redux';
import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';

import { formatToDate } from '../global-helpers/formatToDate';
import { isDayOrNight } from '../global-helpers/isDayOrNight';
import { getWeatherStyling } from '../App/getWeatherStyling';

const ForecastWeather = () => {


    const mainStateReducer = useSelector(state => state.mainStateReducer);

    // Get forecast for 7 days
    const daysArray = mainStateReducer.data[0].daysForecast

    const dispatch = useDispatch()

    const handleDetailsView = (e) => {
        const index = Number(e.target.parentNode.id);
        console.log(index, e.target.parentNode);
        dispatch(setModalDetailsIndex({
            index:index,
            category: "days",
        }));
        dispatch(modalDetailsOpen())
}

    const allDays = daysArray.map(day => {

        const key = daysArray.indexOf(day)

        const thisTimestamp = day.dt;
        const sunriseTimestamp = day.sunrise;
        const sunsetTimestamp = day.sunset;

        const dayOrNight = isDayOrNight(thisTimestamp, sunriseTimestamp, sunsetTimestamp);

        const weather = day.weather[0].description;

        const icon = getWeatherStyling(weather, dayOrNight).icon;

        return (
            <section 
                onClick={handleDetailsView}
                id={key} 
                className="weather__day"
            >
                <p className="weather__date">
                    {formatToDate(thisTimestamp,"day-month")}
                </p>
                <img src={icon} alt="Weather icon" />
                <p className="weather__temperature">
                    {(day.temp.day-273.15).toFixed()}°C / {(day.temp.night-273.15).toFixed()}°C
                </p>
                <p className="weather__day-night">day / night</p>
            </section>
        )})
    return(
        <div className="weather">
            {allDays}
        </div>
    )
}

export default ForecastWeather;
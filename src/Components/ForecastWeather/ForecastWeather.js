import React from 'react';
import './ForecastWeather.scss'; 

import { useSelector, useDispatch } from 'react-redux';
import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';

import { formatToDate } from '../global-helpers/formatToDate';
import { isDayOrNight } from '../global-helpers/isDayOrNight';
import { getWeatherStyling } from '../global-helpers/getWeatherStyling';
import { kelvinToCelsius } from '../global-helpers/kelvinToCelsius';

const ForecastWeather = () => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const dispatch = useDispatch()

    // Get forecast for 7 days
    const daysArray = mainStateReducer.data[0].daysForecast;

    const handleDetailsView = (e) => {

        const index = Number(e.target.parentNode.id);

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
            <section onClick={handleDetailsView} id={key} className="weather__day">

                <p className="weather__date">{formatToDate(thisTimestamp,"day-month")}</p>
                <img src={icon} alt="Weather icon" />
                <p className="weather__temperature">
                    {kelvinToCelsius(day.temp.day)}°C / {kelvinToCelsius(day.temp.night)}°C
                </p>
                <p className="weather__day-night">day / night</p>

            </section>
        )})

    return(
        <>
            <div className="weather__container">
                {allDays}
            </div>
        </>
    )
} 

export default ForecastWeather;
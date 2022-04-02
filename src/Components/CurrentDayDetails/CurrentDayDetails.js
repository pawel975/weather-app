import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import './CurrentDayDetails.css'
import { formatTimestamp } from '../global-helpers/formatTimestamp';

const CurrentDayDetails = () => {

    const [city, setCity] = useState("");

    const URL = "https://freegeoip.app/json/";

    axios.get(URL).then(res => {
        setCity(res.data.city);
    })

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const mainStateReducer = useSelector(state => state.mainStateReducer);

    const {temperature, weather, sunrise, sunset, feelsLike, pressure, clouds, visibility, wind_speed, wind_deg} = mainStateReducer.data[0];

    return (
        <div className='current-day'>
            <div className="current-day__info">
                <div className="current-day__temperature">{temperature}°C</div>
                <div className="current-day__city">{city}</div>
                <div className="current-day__weather">{weather}</div>
                <div className="current-day__params"><p>Sunrise:</p><span>{formatTimestamp(sunrise)}</span></div>
                <div className="current-day__params"><p>Sunset:</p><span>{formatTimestamp(sunset)}</span></div>
                {!isFilterSectionOpen && 
                <>
                    <div className="current-day__params"><p>Feels like:</p><span>{feelsLike} °C</span></div>
                    <div className="current-day__params"><p>Pressure:</p><span>{pressure} hPa</span></div>
                    <div className="current-day__params"><p>Clouds:</p><span>{clouds} %</span></div>
                    <div className="current-day__params"><p>Visibilty:</p><span>{visibility} m</span></div>
                    <div className="current-day__params"><p>Wind speed:</p><span>{wind_speed} m/s</span></div>
                    <div className="current-day__params"><p>Wind deg:</p><span>{wind_deg} deg</span></div>

                </>}
            </div>
        </div>
    )
}

export default CurrentDayDetails;
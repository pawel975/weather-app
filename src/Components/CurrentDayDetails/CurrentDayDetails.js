import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import './CurrentDayDetails.scss'
import { formatTimestamp } from '../global-helpers/formatTimestamp';

const CurrentDayDetails = () => {

    const [city, setCity] = useState("");

    const URL = "https://freegeoip.app/json/";

    axios.get(URL).then(res => {
        setCity(res.data.city);
    })

    const mainStateReducer = useSelector(state => state.mainStateReducer);

    const {temperature, weather, sunrise, sunset, feelsLike, pressure, clouds, visibility, wind_speed, wind_deg} = mainStateReducer.data[0];

    return (
        <>
            <div className='current-day'>

                <div className="current-day__info">
                    <div className="current-day__temperature">{temperature}°C</div>
                    <div className="current-day__city">{city}</div>
                    <div className="current-day__weather">{weather}</div>
                </div>

                <table>
                    <tbody>
                        <tr className="current-day__params">
                            <td>Sunrise:</td>
                            <td>{formatTimestamp(sunrise)}</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Sunset:</td>
                            <td>{formatTimestamp(sunset)}</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Feels:</td>
                            <td>{feelsLike} °C</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Pressure:</td>
                            <td>{pressure} hPa</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Clouds:</td>
                            <td>{clouds} %</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Visibilty:</td>
                            <td>{visibility} m</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Wind speed:</td>
                            <td>{wind_speed} m/s</td>
                        </tr>
                        <tr className="current-day__params">
                            <td>Wind deg:</td>
                            <td>{wind_deg} deg</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>

    )
}

export default CurrentDayDetails;
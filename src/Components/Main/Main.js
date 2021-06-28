import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import './Main.css'


const Main = () => {

    const [city, setCity] = useState("")

    const URL = "https://freegeoip.app/json/"

    axios.get(URL).then(res => {
        setCity(res.data.city)
    })

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const mainStateReducer = useSelector(state => state.mainStateReducer);


    const {temperature, weather , sunrise,sunset,feelsLike,pressure,clouds,visibility, wind_speed, wind_degree} = mainStateReducer.data[0]

    return(
        <div className="main">
            <div className="main__info">
                <div className="main__temperature">{temperature}°C</div>
                <div className="main__city">{city}</div>
                <div className="main__weather">{weather}</div>
                <div className="main__params"><p>Sunrise:</p><span>{sunrise}</span></div>
                <div className="main__params"><p>Sunset:</p><span>{sunset}</span></div>
                {!isFilterSectionOpen && 
                <>
                    <div className="main__params"><p>Feels like:</p><span>{feelsLike} °C</span></div>

                    <div className="main__params"><p>Pressure:</p><span>{pressure} hPa</span></div>

                    <div className="main__params"><p>Clouds:</p><span>{clouds} %</span></div>

                    <div className="main__params"><p>Visibilty:</p><span>{visibility} m</span></div>

                    <div className="main__params"><p>Wind speed:</p><span>{wind_speed} m/s</span></div>

                    <div className="main__params"><p>Wind degree:</p><span>{wind_degree} deg</span></div>

                </>}
            </div>
        </div>
                
    )
}

export default Main;
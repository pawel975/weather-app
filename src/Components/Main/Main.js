import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import './Main.css'


const Main = ({location}) => {

    const [city, setCity] = useState("")

    const URL = "https://freegeoip.app/json/"

    axios.get(URL).then(res => {
        setCity(res.data.city)
    })

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const mainStateReducer = useSelector(state => state.mainStateReducer);


    const {temperature, weather , sunrise,sunset,feelsLike,pressure,clouds,visibility} = mainStateReducer.data[0]

    return(
        <div className="main">
            <div className="main__info">
                <div className="main__temperature">{temperature}°C</div>
                <div className="main__city">{location.lat === 52.22977? "Warszawa" : city}</div>
                <div className="main__weather">{weather}</div>
                <div className="main__params"><p>Sunrise:</p><span>{sunrise}</span></div>
                <div className="main__params"><p>Sunset:</p><span>{sunset}</span></div>
                {!isFilterSectionOpen && 
                <>
                    <div className="main__params"><p>Feels like:</p><span>{feelsLike}°C</span></div>
                    <div className="main__params"><p>Pressure:</p><span>{pressure}</span></div>
                    <div className="main__params"><p>Clouds:</p><span>{clouds}</span></div>
                    <div className="main__params"><p>Visibilty:</p><span>{visibility}</span></div>
                </>}
            </div>
        </div>
                
    )
}

export default Main;
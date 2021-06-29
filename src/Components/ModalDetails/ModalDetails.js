import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ModalDetails.css";

import ClearSkyD from "../../assets/my-assets/animated/clear-sky-d.svg";
import ClearSkyN from "../../assets/my-assets/animated/clear-sky-n.svg";
import FewCloudsD from "../../assets/my-assets/animated/few-clouds-d.svg";
import FewCloudsN from "../../assets/my-assets/animated/few-clouds-n.svg";
import ScatteredCloudsD from "../../assets/my-assets/animated/scattered-clouds-d.svg";
import ScatteredCloudsN from "../../assets/my-assets/animated/scattered-clouds-n.svg";
import BrokenCloudsD from "../../assets/my-assets/animated/broken-clouds-d.svg";
import BrokenCloudsN from "../../assets/my-assets/animated/broken-clouds-n.svg";
import ShowerRainD from "../../assets/my-assets/animated/shower-rain-d.svg";
import ShowerRainN from "../../assets/my-assets/animated/shower-rain-n.svg";
import RainD from "../../assets/my-assets/animated/rain-d.svg";
import RainN from "../../assets/my-assets/animated/rain-n.svg";
import ThunderstormD from "../../assets/my-assets/animated/thunderstorm-d.svg";
import ThunderstormN from "../../assets/my-assets/animated/thunderstorm-d.svg";
import SnowD from "../../assets/my-assets/animated/snow-d.svg";
import SnowN from "../../assets/my-assets/animated/snow-n.svg";
import MistD from "../../assets/my-assets/animated/mist-d.svg";
import MistN from "../../assets/my-assets/animated/mist-n.svg";

import {GrClose} from 'react-icons/gr';
import { modalDetailsClose } from '../../redux/actions';

const ModalDetails = ({formatTimestamp, formatToDate}) => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const dispatch = useDispatch()
    
    const handleModalClose = () => {
        dispatch(modalDetailsClose())
    }

    const changeWeatherIcon = (thisHour, hourWeather) => {
        const sunriseHour = Number((mainStateReducer.data[0].sunrise).slice(0,2));
        const sunsetHour = Number((mainStateReducer.data[0].sunset).slice(0,2));

        let dayOrNight;
        let weatherIcon;

        let hourWeatherHour = Number(formatTimestamp(thisHour).slice(0,2));

        if(hourWeatherHour === sunsetHour){
            dayOrNight = "N";
        }
        else if(hourWeatherHour === sunriseHour){
            dayOrNight = "D";
        }
        else if (sunriseHour < hourWeatherHour && hourWeatherHour < sunsetHour) {
        dayOrNight = "D";
        } 
        else {
        dayOrNight = "N";
        }

        switch (hourWeather) {
        case 'clear sky':
            weatherIcon = dayOrNight === "D"? ClearSkyD:ClearSkyN;
            break;
        case 'few clouds':
        case 'few clouds: 11-25%':
            weatherIcon = dayOrNight ==="D"? FewCloudsD:FewCloudsN;
            break;
        case 'scattered clouds': 
        case 'scattered clouds: 25-50%': 
            weatherIcon = dayOrNight ==="D"? ScatteredCloudsD:ScatteredCloudsN;
            break;
        case 'broken clouds':
        case 'broken clouds: 51-84%':
        case 'overcast clouds':
        case 'overcast clouds: 85-100%':
            weatherIcon = dayOrNight ==="D"? BrokenCloudsD:BrokenCloudsN;
            break;
        case 'shower rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
        case 'heavy intensity shower rain':
        case 'ragged shower rain':
        case 'heavy shower rain and drizzle':
        case 'shower drizzle':
            weatherIcon =  dayOrNight ==="D"? ShowerRainD:ShowerRainN;
            break;
        case 'light rain':
        case 'moderate rain':
        case 'light intensity shower rain':
        case 'light intensity drizzle':
        case 'drizzle':
        case 'heavy intensity drizzle':
        case 'light intensity drizzle rain':
        case 'drizzle rain':
        case 'heavy intensity drizzle rain':
        case 'shower rain and drizzle':
            weatherIcon = dayOrNight ==="D"? RainD:RainN;
            break;
        case 'thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain': 
        case 'light thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
            weatherIcon = dayOrNight ==="D"? ThunderstormD:ThunderstormN;
            break;
        case 'Snow':
        case 'freezing rain':
        case 'Heavy snow':
        case 'Sleet':
        case 'Light shower sleet':
        case 'Shower sleet':
        case 'Light rain and snow':
        case 'Rain and snow':
        case 'Light shower snow':
        case 'Shower snow':
        case 'Heavy shower snow':
            weatherIcon = dayOrNight ==="D"? SnowD:SnowN
            break;
        case 'mist':
        case 'Smoke':
        case 'Haze':
        case 'sand/ dust whirls':
        case 'fog':
        case 'sand':
        case 'dust':
        case 'volcanic ash':
        case 'squalls':
        case 'tornado':
            weatherIcon = dayOrNight ==="D"? MistD:MistN
            break;
        default:
            break;
        }
      return weatherIcon
  }
    const daysOrHours = mainStateReducer.modalDetailsIndex.category

    const categoryPick =
     daysOrHours === "hours" ? 
     mainStateReducer.data[0].hoursForecast[mainStateReducer.modalDetailsIndex.index]
     : 
     mainStateReducer.data[0].daysForecast[mainStateReducer.modalDetailsIndex.index]

    const {dt,sunrise,sunset,temp,feels_like,pressure,clouds,visibility,wind_speed,wind_deg,weather} = categoryPick

    return(
        <>
            <div className="modal-details__background"></div>
            <div className="modal-details">
                <GrClose 
                    onClick={handleModalClose}
                    className="modal-details__modal-close"
                />
                <img src={changeWeatherIcon(dt ,weather[0].description)} alt="" />
                { daysOrHours === "hours"?
                <div className="modal-details__info-section">
                    <div className="modal-details__parameter"><p>Time:</p><span>{formatTimestamp(dt)}</span>
                    </div>
                    <div className="modal-details__parameter"><p>Temperature:</p><span>{(temp-273.15).toFixed()} °C</span>
                    </div>
                    <div className="modal-details__parameter"><p>Feels like:</p><span>{(feels_like-273.15).toFixed()} °C</span>
                    </div>
                    <div className="modal-details__parameter"><p>Pressure:</p><span>{pressure} hPa</span>
                    </div>
                    <div className="modal-details__parameter"><p>Clouds:</p><span>{clouds} %</span>
                    </div>
                    <div className="modal-details__parameter"><p>Visibility:</p><span>{visibility} m</span>
                    </div>
                    <div className="modal-details__parameter"><p>Wind speed:</p><span>{wind_speed} m/s</span>
                    </div>
                    <div className="modal-details__parameter"><p>Wind degree:</p><span>{wind_deg} deg</span>
                    </div>
                </div>
                :
                <div className="modal-details__info-section">
                    <div className="modal-details__parameter"><p>Date:</p><span>{formatToDate(dt,'day-month')}</span>
                    </div>
                    <div className="modal-details__parameter"><p>Sunrise:</p><span>{formatTimestamp(sunrise)}</span>
                    </div>
                    <div className="modal-details__parameter"><p>Sunset:</p><span>{formatTimestamp(sunset)}</span>
                    </div>
                    <div className="modal-details__parameter"><p>Temperature:</p><span>{(temp.day-273.15).toFixed()} °C</span>
                    </div>
                    <div className="modal-details__parameter"><p>Feels like:</p><span>{(feels_like.day-273.15).toFixed()} °C</span>
                    </div>
                    <div className="modal-details__parameter"><p>Pressure:</p><span>{pressure} hPa</span>
                    </div>
                    <div className="modal-details__parameter"><p>Clouds:</p><span>{clouds} %</span>
                    </div>
                    <div className="modal-details__parameter"><p>Wind speed:</p><span>{wind_speed} m/s</span>
                    </div>
                    <div className="modal-details__parameter"><p>Wind degree:</p><span>{wind_deg} deg</span>
                    </div>
                </div>

                }
            </div>
        </>
    )
}



export default ModalDetails;
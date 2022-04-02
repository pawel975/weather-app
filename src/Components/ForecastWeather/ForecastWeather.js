import React from 'react';
import './ForecastWeather.css'; 

import { useSelector, useDispatch } from 'react-redux';
import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';

import ClearSkyD from "../../assets/animated/clear-sky-d.svg";
import ClearSkyN from "../../assets/animated/clear-sky-n.svg";
import FewCloudsD from "../../assets/animated/few-clouds-d.svg";
import FewCloudsN from "../../assets/animated/few-clouds-n.svg";
import ScatteredCloudsD from "../../assets/animated/scattered-clouds-d.svg";
import ScatteredCloudsN from "../../assets/animated/scattered-clouds-n.svg";
import BrokenCloudsD from "../../assets/animated/broken-clouds-d.svg";
import BrokenCloudsN from "../../assets/animated/broken-clouds-n.svg";
import ShowerRainD from "../../assets/animated/shower-rain-d.svg";
import ShowerRainN from "../../assets/animated/shower-rain-n.svg";
import RainD from "../../assets/animated/rain-d.svg";
import RainN from "../../assets/animated/rain-n.svg";
import ThunderstormD from "../../assets/animated/thunderstorm-d.svg";
import ThunderstormN from "../../assets/animated/thunderstorm-d.svg";
import SnowD from "../../assets/animated/snow-d.svg";
import SnowN from "../../assets/animated/snow-n.svg";
import MistD from "../../assets/animated/mist-d.svg";
import MistN from "../../assets/animated/mist-n.svg";

const ForecastWeather = ({formatTimestamp,formatToDate}) => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const daysArray = mainStateReducer.data[0].daysForecast

    const dispatch = useDispatch()

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
        let key = daysArray.indexOf(day)
        return (
        <section 
            onClick={handleDetailsView}
            id={key} 
            className="weather__day"
        >
            <p className="weather__date">{formatToDate(day.dt,"day-month")}</p>
            <img src={changeWeatherIcon(day.dt ,day.weather[0].description)} alt="" />
            <p className="weather__temperature">{(day.temp.day-273.15).toFixed()}°C / {(day.temp.night-273.15).toFixed()}°C</p>
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
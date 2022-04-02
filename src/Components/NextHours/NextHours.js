import React, {useState, useEffect} from 'react';
import './NextHours.css';
import {useSelector, useDispatch} from 'react-redux';

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
import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';

const NextHours = ({formatTimestamp, formatToDate}) => {
    
    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const hoursArray = mainStateReducer.data[0].hoursForecast

    const hoursInSlider = [3,4,6,8,12];
    const containerWidth = [1600,1200,800,600,400];
    const maxSliderMove = [1500,1100,700,500,300]; 
    const minSliderMove = 0;

    const [move,setMove] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);

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
    
    const updateWindowWidth = () => {
        // setMove(0);
        const windowSize = window.innerWidth
        if (windowSize <= 400) {
            setSliderIndex(0)
        } else if (windowSize <=800) {
            setSliderIndex(1)
        } else if (windowSize <=1400) {
            setSliderIndex(2)
        } else if (windowSize <=2000) {
            setSliderIndex(3)
        } else{
            setSliderIndex(4)
        }
    }

    const handleMoveRight = () => {
        console.log(move + "right");
        if(move===maxSliderMove[sliderIndex]) return
        setMove(move+100);
    }
    
    const handleMoveLeft = () => {
        console.log(move + "left");
        if(move===minSliderMove) return setMove(minSliderMove);
        setMove(move-100);
    }

    window.addEventListener('resize', updateWindowWidth)

    const handleDetailsView = (e) => {
        const index = Number(e.target.parentNode.id);
        console.log(index, e.target.parentNode);
        dispatch(setModalDetailsIndex({
            index:index,
            category: "hours",
        }));
        dispatch(modalDetailsOpen())
    }

    useEffect(() => {
        updateWindowWidth()
    }, []);
    
    const allHours = hoursArray.map(hour => {
        let key = hoursArray.indexOf(hour)
        return (
        <div 
            id={key}
            style={{width:`calc(100%/${hoursInSlider[sliderIndex]}`}} className="hours-weather__element"
            onClick={handleDetailsView}
        >
            <p className="hours-weather__element__time">{formatTimestamp(hour.dt)}</p>
            <p className="hours-weather__element__date">{formatToDate(hour.dt, "day-month")}</p>
            <img src={changeWeatherIcon(hour.dt ,hour.weather[0].description)} alt="" />
            <p className="hours-weather__element__temperature">{(hour.temp-273.15).toFixed()}°C</p>
            
        </div>
    )})


    return(

        <div className="container">
            
            {sliderIndex >= 2 && 
            <button  
                className={`hours-weather__button ${move===minSliderMove? "hours-weather__button--disabled":""}`} 
                style={{zIndex:1}} 
                onClick={handleMoveLeft}>
                    {'<'}
            </button>}

            <div style={{overflow:`${sliderIndex >=2 ? "hidden":""}`}} className="hours-weather">
                <div 
                    style={{left:`-${move}%`, width:`${containerWidth[sliderIndex]}%`}} className="hours-weather__container"
                >
                    {allHours}
                </div>
            </div>

            {sliderIndex >= 2 &&
            <button 
                className={`hours-weather__button ${move===maxSliderMove[sliderIndex]? "hours-weather__button--disabled":""}`} 
                style={{zIndex:1}} onClick={handleMoveRight}>
                    {'>'}
            </button>}

        </div>
    )
}

export default NextHours;
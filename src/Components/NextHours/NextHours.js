import React, {useState, useEffect} from 'react';
import './NextHours.css';
import {useSelector} from 'react-redux';

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

const NextHours = ({formatTimestamp}) => {
    
    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const hoursArray = mainStateReducer.data[0].hours

    const hoursInSlider = [3,4,6,8,12];
    const containerWidth = [1600,1200,800,600,400];
    const maxSliderMove = [1500,1100,700,500,300]; 
    const minSliderMove = 0;
    // let sliderIndex = 0;

    const [move,setMove] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0)

    const changeWeatherIcon = (hourWeather) => {
        const sunriseHour = Number((mainStateReducer.data[0].sunrise).slice(0,2));
        const sunriseMinutes = Number((mainStateReducer.data[0].sunrise).slice(3,5));
        const sunsetHour = Number((mainStateReducer.data[0].sunset).slice(0,2));
        const sunsetMinutes = Number((mainStateReducer.data[0].sunset).slice(3,5));

        let currentHour = new Date().getHours();
        let currentMinutes = new Date().getMinutes();

        let dayOrNight;
        let weatherIcon;

        if(currentHour === sunsetHour){
        if(currentMinutes < sunsetMinutes) {
            dayOrNight = "D";
        } else {
            dayOrNight = "N";
        }
        }
        else if(currentHour === sunriseHour){
        if(currentMinutes > sunriseMinutes) {
            dayOrNight = "D";
        } else {
            dayOrNight = "N";
        }
        }
        else if (sunriseHour < currentHour && currentHour < sunsetHour) {
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
            weatherIcon = dayOrNight ==="D"? FewCloudsD:FewCloudsN;
            break;
        case 'scattered clouds':
            weatherIcon = dayOrNight ==="D"? ScatteredCloudsD:ScatteredCloudsN;
            break;
        case 'broken clouds':
            weatherIcon = dayOrNight ==="D"? BrokenCloudsD:BrokenCloudsN;
            break;
        case 'shower rain':
            weatherIcon =  dayOrNight ==="D"? ShowerRainD:ShowerRainN;
            break;
        case 'rain':
            weatherIcon = dayOrNight ==="D"? RainD:RainN;
            break;
        case 'thunderstorm':
            weatherIcon = dayOrNight ==="D"? ThunderstormD:ThunderstormN;
            break;
        case 'snow':
            weatherIcon = dayOrNight ==="D"? SnowD:SnowN
            break;
        case 'mist':
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

    useEffect(() => {
        updateWindowWidth()
    }, []);
    
    const allHours = hoursArray.map(hour => (
        <div 
            key={hour.weather.id}
            style={{width:`calc(100%/${hoursInSlider[sliderIndex]}`}} className="hours-weather__element"
        >
            <p>{formatTimestamp(hour.dt)}</p>
            <img src={changeWeatherIcon(hour.weather[0].description)} alt="" />
        </div>
    ))

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
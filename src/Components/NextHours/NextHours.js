import React, {useState, useEffect} from 'react';
import './NextHours.css';
import {useSelector, useDispatch} from 'react-redux';

import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';
import { formatTimestamp } from '../global-helpers/formatTimestamp';
import { formatToDate } from '../global-helpers/formatToDate';
import { isDayOrNight } from '../global-helpers/isDayOrNight';
import { getWeatherStyling } from '../global-helpers/getWeatherStyling';
import { kelvinToCelsius } from '../global-helpers/kelvinToCelsius';

const NextHours = () => {
    
    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const hoursArray = mainStateReducer.data[0].hoursForecast;

    const hoursInSlider = [3,4,6,8,12];
    const containerWidth = [1600,1200,800,600,400];
    const maxSliderMove = [1500,1100,700,500,300]; 
    const minSliderMove = 0;

    const [move, setMove] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);

    const dispatch = useDispatch()
    
    const updateWindowWidth = () => {
        
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

        if(move === maxSliderMove[sliderIndex]) return
        setMove(move+100);
    }
    
    const handleMoveLeft = () => {

        if(move === minSliderMove) return setMove(minSliderMove);
        setMove(move - 100);
    }

    const handleDetailsView = (e) => {
        
        const index = Number(e.target.parentNode.id);
        dispatch(setModalDetailsIndex({
            index:index,
            category: "hours",
        }));
        dispatch(modalDetailsOpen())
    }

    window.addEventListener('resize', updateWindowWidth)

    useEffect(() => {
        updateWindowWidth()
    }, []);
    
    const allHours = hoursArray.map(hour => {

        const key = hoursArray.indexOf(hour)

        const thisTimestamp = hour.dt;
        const sunriseTimestamp = hour.sunrise;
        const sunsetTimestamp = hour.sunset;

        const dayOrNight = isDayOrNight(thisTimestamp, sunriseTimestamp, sunsetTimestamp);
        const weather = hour.weather[0].description;
        const icon = getWeatherStyling(weather, dayOrNight).icon;

        return (
            <div 
                id={key}
                style={{width:`calc(100%/${hoursInSlider[sliderIndex]}`}} className="hours-weather__element"
                onClick={handleDetailsView}
            >

                <p className="hours-weather__element__time">{formatTimestamp(thisTimestamp)}</p>
                <p className="hours-weather__element__date">{formatToDate(thisTimestamp, "day-month")}</p>
                <img src={icon} alt="weather icon" />
                <p className="hours-weather__element__temperature">{kelvinToCelsius(hour.temp)}°C</p>
                
            </div>
    )})

    return(

        <div className="container">
            
            {sliderIndex >= 2 && 
                <button  
                    className={`hours-weather__button ${move === minSliderMove? "hours-weather__button--disabled":""}`} 
                    onClick={handleMoveLeft}>
                    {'<'}
                </button>
            }

            {/* Disables scroll on desktop so slider moves by pressing buttons */}
            <div style={{overflow:`${sliderIndex >= 2 ? "hidden":""}`}} className="hours-weather">
                <div 
                    style={{left:`-${move}%`, width:`${containerWidth[sliderIndex]}%`}} className="hours-weather__container"
                >
                    {allHours}
                </div>
            </div>

            {sliderIndex >= 2 &&
                <button 
                    className={`hours-weather__button ${move === maxSliderMove[sliderIndex]? "hours-weather__button--disabled":""}`} 
                    onClick={handleMoveRight}>
                    {'>'}
                </button>
            }

        </div>
    )
}

export default NextHours;
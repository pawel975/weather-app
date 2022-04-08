import './NextHours.scss';
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
    const sunrise = mainStateReducer.data[0].sunrise;
    const sunset = mainStateReducer.data[0].sunset;

    const dispatch = useDispatch()

    const handleDetailsView = (e) => {
        
        const index = Number(e.target.parentNode.id);
        dispatch(setModalDetailsIndex({
            index:index,
            category: "hours",
        }));
        dispatch(modalDetailsOpen())
    }

    const allHours = hoursArray.map(hour => {

        const key = hoursArray.indexOf(hour)

        const thisTimestamp = hour.dt;
        const sunriseTimestamp = sunrise;
        const sunsetTimestamp = sunset;

        const dayOrNight = isDayOrNight(thisTimestamp, sunriseTimestamp, sunsetTimestamp);
        const weather = hour.weather[0].description;
        const icon = getWeatherStyling(weather, dayOrNight).icon;

        return (
            <div 
                id={key}
                className="hours-weather__element"
                onClick={handleDetailsView}
            >

                <p className="hours-weather__element__time">{formatTimestamp(thisTimestamp)}</p>
                <p className="hours-weather__element__date">{formatToDate(thisTimestamp, "day-month")}</p>
                <img src={icon} alt="weather icon" />
                <p className="hours-weather__element__temperature">{kelvinToCelsius(hour.temp)}°C</p>
                
            </div>
    )})

    return (
        <div className="hours-weather__container">
            {allHours}
        </div>
    )
}

export default NextHours;
import { formatTimestamp } from "../global-helpers/formatTimestamp";
import { formatToDate } from "../global-helpers/formatToDate";
import { getWeatherStyling } from "../global-helpers/getWeatherStyling";
import { isDayOrNight } from "../global-helpers/isDayOrNight";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";
import './SingleHourForecast.scss';

const SingleHourForecast = ({key, hour, sunrise, sunset, handleDetailsView}) => {

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
                <div>
                    <p className="hours-weather__element__time">{formatTimestamp(thisTimestamp)}</p>
                    <p className="hours-weather__element__date">{formatToDate(thisTimestamp, "day-month")}</p>
                </div>
                
                <img src={icon} alt="weather icon" />
                <p className="hours-weather__element__temperature">{kelvinToCelsius(hour.temp)}°C</p>
                
            </div>
        )
}

export default SingleHourForecast;
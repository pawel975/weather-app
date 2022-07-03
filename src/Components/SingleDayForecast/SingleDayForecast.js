import { formatToDate } from "../global-helpers/formatToDate";
import { getWeatherStyling } from "../global-helpers/getWeatherStyling";
import { isDayOrNight } from "../global-helpers/isDayOrNight";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";
import './SingleDayForecast.scss';

const SingleDayForecast = ({key, day, handleDetailsView}) => {

        const thisTimestamp = day.dt;
        const sunriseTimestamp = day.sunrise;
        const sunsetTimestamp = day.sunset;

        const dayOrNight = isDayOrNight(thisTimestamp, sunriseTimestamp, sunsetTimestamp);
        const weather = day.weather[0].description;
        const icon = getWeatherStyling(weather, dayOrNight).icon;

        return (
            <button 
                onClick={handleDetailsView} 
                id={key} 
                className="weather__day"
                tabIndex="0"
            >

                <p className="weather__date">{formatToDate(thisTimestamp,"day-month")}</p>
                <img src={icon} alt="Weather icon" />
                <div>
                    <p className="weather__temperature">
                        {kelvinToCelsius(day.temp.day)}°C / {kelvinToCelsius(day.temp.night)}°C
                    </p>
                    <p className="weather__day-night">day / night</p>
                </div>

            </button>
        )
}

export default SingleDayForecast;
import { formatTimestamp } from "../global-helpers/formatTimestamp";
import { formatToDate } from "../global-helpers/formatToDate";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";

const ModalDetailsDays = ({categoryPick}) => {

    const {dt, sunrise, sunset, temp, feels_like, pressure, clouds, wind_speed, wind_deg} = categoryPick

    return (
        <div className="modal-details__info-section">
            <div className="modal-details__parameter"><p>Date:</p><span>{formatToDate(dt,'day-month')}</span></div>
            <div className="modal-details__parameter"><p>Sunrise:</p><span>{formatTimestamp(sunrise)}</span></div>
            <div className="modal-details__parameter"><p>Sunset:</p><span>{formatTimestamp(sunset)}</span></div>
            <div className="modal-details__parameter"><p>Temperature:</p><span>{kelvinToCelsius(temp)} °C</span></div>
            <div className="modal-details__parameter"><p>Feels like:</p><span>{kelvinToCelsius(feels_like)} °C</span></div>
            <div className="modal-details__parameter"><p>Pressure:</p><span>{pressure} hPa</span></div>
            <div className="modal-details__parameter"><p>Clouds:</p><span>{clouds} %</span></div>
            <div className="modal-details__parameter"><p>Wind speed:</p><span>{wind_speed} m/s</span></div>
            <div className="modal-details__parameter"><p>Wind degree:</p><span>{wind_deg} deg</span></div>
        </div>
    )
}

export default ModalDetailsDays;
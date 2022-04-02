import { formatTimestamp } from "../global-helpers/formatTimestamp";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";

const ModalDetailsHours = ({categoryPick}) => {

    const {dt, temp, feels_like, pressure, clouds, visibility, wind_speed, wind_deg} = categoryPick

    return (
        <div className="modal-details__info-section">
            <div className="modal-details__parameter"><p>Time:</p><span>{formatTimestamp(dt)}</span></div>
            <div className="modal-details__parameter"><p>Temperature:</p><span>{kelvinToCelsius(temp)} °C</span></div>
            <div className="modal-details__parameter"><p>Feels like:</p><span>{kelvinToCelsius(feels_like)} °C</span></div>
            <div className="modal-details__parameter"><p>Pressure:</p><span>{pressure} hPa</span></div>
            <div className="modal-details__parameter"><p>Clouds:</p><span>{clouds} %</span></div>
            <div className="modal-details__parameter"><p>Visibility:</p><span>{visibility} m</span></div>
            <div className="modal-details__parameter"><p>Wind speed:</p><span>{wind_speed} m/s</span></div>
            <div className="modal-details__parameter"><p>Wind degree:</p><span>{wind_deg} deg</span></div>
        </div>
    )
}

export default ModalDetailsHours;
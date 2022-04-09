import { formatTimestamp } from "../global-helpers/formatTimestamp";
import { formatToDate } from "../global-helpers/formatToDate";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";

const ModalDetailsDays = ({categoryPick}) => {

    const {dt, sunrise, sunset, temp, feels_like, pressure, clouds, wind_speed, wind_deg} = categoryPick
    
    return (
        <div className="modal-details__info-section">
            <table>
                <tbody>
                    <tr className="modal-details__parameter">
                        <td>Date:</td>
                        <td>{formatToDate(dt,'day-month')}</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Sunrise:</td>
                        <td>{formatTimestamp(sunrise)}</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Sunset:</td>
                        <td>{formatTimestamp(sunset)}</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Temperature:</td>
                        <td>{kelvinToCelsius(temp.day)} / {kelvinToCelsius(temp.night)} °C</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Feels like:</td>
                        <td>{kelvinToCelsius(feels_like.day)} / {kelvinToCelsius(feels_like.night)} °C</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Pressure:</td>
                        <td>{pressure} hPa</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Clouds:</td>
                        <td>{clouds} %</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Wind speed:</td>
                        <td>{wind_speed} m/s</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Wind degree:</td>
                        <td>{wind_deg} deg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ModalDetailsDays;
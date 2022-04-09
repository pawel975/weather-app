import { formatTimestamp } from "../global-helpers/formatTimestamp";
import { kelvinToCelsius } from "../global-helpers/kelvinToCelsius";

const ModalDetailsHours = ({categoryPick}) => {

    const {dt, temp, feels_like, pressure, clouds, visibility, wind_speed, wind_deg} = categoryPick

    return (
        <div className="modal-details__info-section">
            <table>
                <tbody>
                    <tr className="modal-details__parameter">
                        <td>Time: </td>
                        <td>{formatTimestamp(dt)}</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Temperature:</td>
                        <td>{kelvinToCelsius(temp)} °C</td>
                    </tr>
                    <tr className="modal-details__parameter">
                        <td>Feels like:</td>
                        <td>{kelvinToCelsius(feels_like)} °C</td>
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
                        <td>Visibilty:</td>
                        <td>{visibility} m</td>
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

export default ModalDetailsHours;
import React from 'react';
import './Main.css'

const Main = () => {

    return(
        <div className="main">
            <div className="main-info">
                <div className="main-temperature">20°C</div>
                <div className="main-city">Bydgoszcz</div>
                <div className="main-weather">Cloudy</div>
                <div className="main-details">
                    <div className="details-params"><p>Sunrise:</p><span>06:00</span></div>
                    <div className="details-params"><p>Sunset:</p><span>21:00</span></div>
                    <div className="details-params"><p>Feels like:</p><span>22*C</span></div>
                    <div className="details-params"><p>Pressure:</p><span>1006</span></div>
                    <div className="details-params"><p>Clouds:</p><span>40</span></div>
                    <div className="details-params"><p>Visibilty:</p><span>10000</span></div>
                </div>
            </div>
            <div style={{display: "none"}} className="quote">XD</div>
        </div>
    )
}

export default Main;
import React from 'react';
import {useSelector} from 'react-redux';
import './Main.css'

const Main = () => {

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);

    return(
        <div className="main">
            <div className="main__info">
                <div className="main__temperature">20°C</div>
                <div className="main__city">Bydgoszcz</div>
                <div className="main__weather">Cloudy</div>
                {!isFilterSectionOpen && <div className="main__details">
                    <div className="main__params"><p>Sunrise:</p><span>06:00</span></div>
                    <div className="main__params"><p>Sunset:</p><span>21:00</span></div>
                    <div className="main__params"><p>Feels like:</p><span>22°C</span></div>
                    <div className="main__params"><p>Pressure:</p><span>1006</span></div>
                    <div className="main__params"><p>Clouds:</p><span>40</span></div>
                    <div className="main__params"><p>Visibilty:</p><span>10000</span></div>
                </div>}
            </div>
            <div style={{display: "none"}} className="quote">XD</div>
        </div>
    )
}

export default Main;
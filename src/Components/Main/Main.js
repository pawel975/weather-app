import React from 'react';
import {useSelector} from 'react-redux';
import './Main.css'

const Main = () => {

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const mainStateReducer = useSelector(state => state.mainStateReducer);

    return(
        <div className="main">
            <div className="main__info">
                <div className="main__temperature">20°C</div>
                <div className="main__city">Bydgoszcz</div>
                <div className="main__weather">Cloudy</div>
                <div className="main__feels">Feels like</div>
                {!isFilterSectionOpen && 
                <>
                    <div className="main__params"><p>Sunrise:</p><span>{mainStateReducer.data[0].sunrise}</span></div>
                    <div className="main__params"><p>Sunset:</p><span>{mainStateReducer.data[0].sunset}</span></div>
                    <div className="main__params"><p>Feels like:</p><span>{(mainStateReducer.data[0].feelsLike-273.15).toFixed()}°C</span></div>
                    <div className="main__params"><p>Pressure:</p><span>{mainStateReducer.data[0].pressure}</span></div>
                    <div className="main__params"><p>Clouds:</p><span>{mainStateReducer.data[0].clouds}</span></div>
                    <div className="main__params"><p>Visibilty:</p><span>{mainStateReducer.data[0].visibility}</span></div>
                </>}
            </div>
        </div>
    )
}

export default Main;
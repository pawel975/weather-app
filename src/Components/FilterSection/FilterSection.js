import React from 'react';
import ForecastWeather from '../ForecastWeather/ForecastWeather';
import HistoricalWeather from '../HistoricalWeather/HistoricalWeather';
import NextHours from '../NextHours/NextHours';
import './FilterSection.css';

const FilterSection = () => {

    return(
        <div className="filter-section">
            <div className="filter-section__choose-filter">
                <button className="filter-section__button-filter">Next 48h</button>
                <hr/>
                <button className="filter-section__button-filter">Next 7 days</button>
                <hr/>
                <button className="filter-section__button-filter">Last 5 days</button>
            </div>
            <NextHours/>
            {/* <ForecastWeather/> */}
            {/* <HistoricalWeather/> */}
        </div>
    )
}

export default FilterSection;
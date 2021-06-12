import React, {useState} from 'react';
import ForecastWeather from '../ForecastWeather/ForecastWeather';
import HistoricalWeather from '../HistoricalWeather/HistoricalWeather';
import NextHours from '../NextHours/NextHours';
import './FilterSection.css';

const FilterSection = ({height, formatTimestamp, formatToDate}) => {

    const [filterChoice, setFilterChoice] = useState(0);

    const handleFilterButtonClick = (e) => {
        const buttonIndex = Number(e.target.value);
        setFilterChoice(buttonIndex)
    }

    return(
        <div style={{height:`${height}`}} className="filter-section">
            <div className="filter-section__choose-filter">
                <button onClick={handleFilterButtonClick} value={0} className="filter-section__button-filter">Next 48h</button>
                <hr/>
                <button onClick={handleFilterButtonClick} value={1} className="filter-section__button-filter">Next 7 days</button>
                <hr/>
                <button onClick={handleFilterButtonClick} value={2} className="filter-section__button-filter">Last 5 days</button>
            </div>
            {filterChoice===0 && <NextHours formatTimestamp={formatTimestamp} formatToDate={formatToDate}/>}
            {filterChoice===1 && <ForecastWeather formatTimestamp={formatTimestamp} formatToDate={formatToDate}/>}
            {filterChoice===2 && <HistoricalWeather formatTimestamp={formatTimestamp} formatToDate={formatToDate}  />}
        </div>
    )
}

export default FilterSection;
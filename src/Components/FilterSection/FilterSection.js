import React, {useState} from 'react';
import DaysForecast from '../DaysForecast/DaysForecast';
import ForecastWrapper from '../ForecastWrapper/ForecastWrapper';
import HoursForecast from '../HoursForecast/HoursForecast';
import './FilterSection.scss';

const FilterSection = () => {

    const [filterChoice, setFilterChoice] = useState(0);

    const handleFilterButtonClick = (e) => {
        
        const buttonIndex = Number(e.target.value);
        setFilterChoice(buttonIndex)
    }

    return(
        <div className="filter-section">

            <div className="filter-section__choose-filter ">

                <button 
                    onClick={handleFilterButtonClick} 
                    value={0} 
                    className={`filter-section__button-filter 
                    ${filterChoice === 0 && "filter-section__button-active"}`}>
                        Next 48h
                </button>

                <button 
                    onClick={handleFilterButtonClick} 
                    value={1} 
                    className={`filter-section__button-filter 
                    ${filterChoice === 1 && "filter-section__button-active"}`}>
                        Next 7 days
                </button>

            </div>

            <div className='filter-section__choose-container'>

            <ForecastWrapper>
                {filterChoice === 0 && <HoursForecast/>}
                {filterChoice === 1 && <DaysForecast/>}
            </ForecastWrapper>

            </div>


        </div>
    )
}

export default FilterSection;
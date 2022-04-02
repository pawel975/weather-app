import React, {useState} from 'react';
import ForecastWeather from '../ForecastWeather/ForecastWeather';
import NextHours from '../NextHours/NextHours';
import './FilterSection.css';

const FilterSection = ({height}) => {

    const [filterChoice, setFilterChoice] = useState(0);

    const handleFilterButtonClick = (e) => {
        
        const buttonIndex = Number(e.target.value);
        setFilterChoice(buttonIndex)
    }

    return(
        <div style={{height:`${height}`}} className="filter-section">

            <div className="filter-section__choose-filter ">

                <button 
                    onClick={handleFilterButtonClick} 
                    value={0} 
                    className={`filter-section__button-filter 
                    ${filterChoice === 0 && "filter-section__button-active"}`}>
                        Next 48h
                </button>

                <hr/>

                <button 
                    onClick={handleFilterButtonClick} 
                    value={1} 
                    className={`filter-section__button-filter 
                    ${filterChoice === 1 && "filter-section__button-active"}`}>
                        Next 7 days
                </button>

            </div>

            {filterChoice === 0 && <NextHours/>}
            {filterChoice === 1 && <ForecastWeather/>}

        </div>
    )
}

export default FilterSection;
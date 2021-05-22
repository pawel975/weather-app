import React from 'react';
import './FilterSection.css';

const FilterSection = () => {

    return(
        <div className="filter-section">
            <div className="filter-section__choose-filter">
                <button className="filter-section__button-filter">Next 48H</button>
                <hr/>
                <button className="filter-section__button-filter">Next 7 days</button>
                <hr/>
                <button className="filter-section__button-filter">Last 5 days</button>
            </div>
        </div>
    )
}

export default FilterSection;
import React from 'react';
import './Dropdown.css'
import {MdKeyboardArrowUp} from 'react-icons/md'
import FilterSection from '../FilterSection/FilterSection';

const Dropdown = () => {

    return(
        <div className="dropdown">
            <div className="dropdown__arrow-container">
                <MdKeyboardArrowUp className="dropdown__arrow dropdown__arrow--up"/>
            </div>
            <div className="dropdown__bar"></div>
            <FilterSection/>
        </div>
    )
}

export default Dropdown;
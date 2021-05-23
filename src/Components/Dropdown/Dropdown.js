import React, { useState } from 'react';
import './Dropdown.css'
import {MdKeyboardArrowUp} from 'react-icons/md'
import FilterSection from '../FilterSection/FilterSection';

const Dropdown = () => {

    const [isFilterSectionOpen,setIsFilterSectionOpen] = useState(false)

    const handleFilterSectionOpenClick = () => {
        setIsFilterSectionOpen(!isFilterSectionOpen)
    }

    return(
        <div style={isFilterSectionOpen? {bottom:'0%'}:{bottom:"-40%"}}         className="dropdown">
            <div onClick={handleFilterSectionOpenClick} className="dropdown__arrow-container">
                <MdKeyboardArrowUp className="dropdown__arrow dropdown__arrow--up"/>
            </div>
            <div className="dropdown__bar"></div>
            {/* <FilterSection height={isFilterSectionOpen?'40vh':'0vh'}/> */}
            <FilterSection/>
        </div>
    )
}

export default Dropdown;
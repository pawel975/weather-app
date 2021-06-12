import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {open} from '../../redux/actions';
import {close} from '../../redux/actions';
import './Dropdown.css'
import {MdKeyboardArrowUp} from 'react-icons/md'
import FilterSection from '../FilterSection/FilterSection';

const Dropdown = ({formatTimestamp, formatToDate}) => {

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const dispatch = useDispatch();

    const handleFilterSectionOpenClick = () => {
        if (isFilterSectionOpen) {
            dispatch(close())
        } else {
            dispatch(open())
        }
    }


    return(
        <div style={isFilterSectionOpen? {bottom:'0%'}:{bottom:"-40%"}} className="dropdown">
            <div onClick={handleFilterSectionOpenClick} className="dropdown__arrow-container">
                <MdKeyboardArrowUp className="dropdown__arrow dropdown__arrow--up"/>
            </div>
            <div className="dropdown__bar"></div>
            {/* <FilterSection height={isFilterSectionOpen?'40vh':'0vh'}/> */}
            <FilterSection formatTimestamp={formatTimestamp} formatToDate={formatToDate}/>
        </div>
    )
}

export default Dropdown;
import React, {useRef } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {open} from '../../redux/actions';
import {close} from '../../redux/actions';
import './Dropdown.css'
import {MdKeyboardArrowUp} from 'react-icons/md'
import FilterSection from '../FilterSection/FilterSection';

const Dropdown = () => {

    const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
    const dispatch = useDispatch();

    const handleFilterSectionOpenClick = () => {
        if (isFilterSectionOpen) {
            dispatch(close())
        } else {
            dispatch(open())
        }
    }

    const draggableFilterSection = useRef()
    
    
    // const mousedown =(e)=> {
        
    //     // let prevX = e.clientX;
    //     let prevY = e.clientY;
        
    //     const mousemove = (e) => {
    //         // let newX = prevX - e.clientX;
    //         // let newY = prevY - e.clientY;
    //         let place = e.clientY/window.innerWidth *100

    //         console.log(place.toFixed())
    //         console.log(e.clientY)
    //         console.log(draggableFilterSection)
            
    //         draggableFilterSection.current.style.bottom = `${100 - place.toFixed()-40}%`
    //         console.log(draggableFilterSection.current.style.bottom = `${100 - place.toFixed()-40}%`)
            
    //         prevY = e.clientY;
    //     }
        
    //     const mouseup = () => {
    //         window.removeEventListener('mousemove',mousemove)
    //         window.removeEventListener("mouseup", mouseup)
            
    //     }
        
    //     window.addEventListener("mousemove",mousemove);
    //     window.addEventListener("mouseup",mouseup);
    // }
    
    // window.addEventListener("mousedown",mousedown)

    return(
        <div ref={draggableFilterSection}  style={isFilterSectionOpen? {bottom:'0%'}:{bottom:"-40%"}} className="dropdown">
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
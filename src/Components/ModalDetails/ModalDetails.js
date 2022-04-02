import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./ModalDetails.css";

import {GrClose} from 'react-icons/gr';
import { modalDetailsClose } from '../../redux/actions';
import { getWeatherStyling } from '../global-helpers/getWeatherStyling';
import { isDayOrNight } from '../global-helpers/isDayOrNight';
import ModalDetailsHours from '../ModalDetailsHours/ModalDetailsHours';
import ModalDetailsDays from '../ModalDetailsDays/ModalDetailsDays';

const ModalDetails = () => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const dispatch = useDispatch()
    
    const handleModalClose = () => {
        dispatch(modalDetailsClose())
    }

    const daysOrHours = mainStateReducer.modalDetailsIndex.category

    const categoryPick =
     daysOrHours === "hours" ? 
     mainStateReducer.data[0].hoursForecast[mainStateReducer.modalDetailsIndex.index] : 
     mainStateReducer.data[0].daysForecast[mainStateReducer.modalDetailsIndex.index]

    const {dt, sunrise, sunset, weather} = categoryPick
    console.log(categoryPick);

    const dayOrNight = isDayOrNight(dt, sunrise, sunset);
    const icon = getWeatherStyling(weather[0].description, dayOrNight).icon;

    return(
        <>
            <div className="modal-details__background"></div>
            <div className="modal-details">
                <GrClose 
                    onClick={handleModalClose}
                    className="modal-details__modal-close"
                />
                <img src={icon} alt="weather icon" />

                { daysOrHours === "hours" ?
                    <ModalDetailsHours categoryPick={categoryPick}/> :
                    <ModalDetailsDays categoryPick={categoryPick}/>
                }
            </div>
        </>
    )
}



export default ModalDetails;
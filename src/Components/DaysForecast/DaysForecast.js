import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';

import SingleDayForecast from '../SingleDayForecast/SingleDayForecast';

const DaysForecast = () => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const dispatch = useDispatch()

    // Get forecast for 7 days
    const daysArray = mainStateReducer.data[0].daysForecast;

    const handleDetailsView = (e) => {

        const index = Number(e.target.parentNode.id);

        dispatch(setModalDetailsIndex({
            index:index,
            category: "days",
        }));

        dispatch(modalDetailsOpen())
    }

    const allDays = daysArray.map(day => (
        <SingleDayForecast 
            key={daysArray.indexOf(day)}
            day={day}
            handleDetailsView={handleDetailsView}
        />
    ))

    return(
        <>
            {allDays}
        </>
    )
} 

export default DaysForecast;
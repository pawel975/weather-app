import {useSelector, useDispatch} from 'react-redux';

import { setModalDetailsIndex,modalDetailsOpen } from '../../redux/actions';
import SingleHourForecast from '../SingleHourForecast/SinglHourForecast';

const HoursForecast = () => {
    
    const mainStateReducer = useSelector(state => state.mainStateReducer);
    const hoursArray = mainStateReducer.data[0].hoursForecast;
    const sunrise = mainStateReducer.data[0].sunrise;
    const sunset = mainStateReducer.data[0].sunset;

    const dispatch = useDispatch()

    const handleDetailsView = (e) => {

        const index = Number(e.target.parentNode.id);
        dispatch(setModalDetailsIndex({
            index:index,
            category: "hours",
        }));
        dispatch(modalDetailsOpen())
    }

    const allHours = hoursArray.map(hour => (
        <SingleHourForecast 
            key={hoursArray.indexOf(hour)} 
            hour={hour}
            sunrise={sunrise}
            sunset={sunset} 
            handleDetailsView={handleDetailsView}
        />
    ))

    return (
        <>
            {allHours}
        </>
    )
}

export default HoursForecast;
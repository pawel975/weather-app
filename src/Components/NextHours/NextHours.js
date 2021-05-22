import React, {useState} from 'react';
import './NextHours.css';

const NextHours = () => {

    const testArray = [1,2,3,4,5,6,7,8];
    let sliceStart = 0;
    const sliceElementsCount = 5;
    let sliceEnd = sliceStart+sliceElementsCount;
    let sliceArray = testArray.slice(sliceStart,sliceEnd);

    const [state, setState] = useState(sliceArray)
    console.log(state)
    
    const handleClick = () => {
        sliceStart = sliceEnd;
        sliceEnd = sliceStart+sliceElementsCount;
        sliceArray = testArray.slice(sliceStart,sliceEnd);
        console.log(sliceStart,sliceEnd,sliceArray)
        setState(sliceArray)
    }

    const allHours = state.map(hour => (
        <div style={{width:`calc(100%/${sliceElementsCount}`}} className="hours-weather__element">
            <p>{hour}</p>
        </div>
    ))

    return(
        <div className="hours-weather">
            <button>{'<'}</button>
                <div className="hours-weather__container">
                    {allHours}
                </div>
            <button onClick={handleClick}>{'>'}</button>
        </div>
    )
}

export default NextHours;
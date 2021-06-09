import React, {useState, useEffect} from 'react';
import './NextHours.css';
import {useSelector,useDispatch} from 'react-redux';

const NextHours = () => {

    const mainStateReducer = useSelector(state => state.mainStateReducer);
    // const dispatch = useDispatch()

    const hoursArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
    // const hoursArray = mainStateReducer.data[0].hourly

    const hoursInSlider = [3,4,6,8,12];
    const containerWidth = [1600,1200,800,600,400];
    const maxSliderMove = [1500,1100,700,500,300]; 
    const minSliderMove = 0;
    // let sliderIndex = 0;

    const [state, setState] = useState(hoursArray)
    const [move,setMove] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0)
    
    const updateWindowWidth = () => {
        // setMove(0);
        const windowSize = window.innerWidth
        if (windowSize <= 400) {
            setSliderIndex(0)
        } else if (windowSize <=800) {
            setSliderIndex(1)
        } else if (windowSize <=1400) {
            setSliderIndex(2)
        } else if (windowSize <=2000) {
            setSliderIndex(3)
        } else{
            setSliderIndex(4)
        }
    }

    const handleMoveRight = () => {
        console.log(move + "right");
        if(move===maxSliderMove[sliderIndex]) return
        setMove(move+100);
    }
    
    const handleMoveLeft = () => {
        console.log(move + "left");
        if(move===minSliderMove) return setMove(minSliderMove);
        setMove(move-100);
    }

    window.addEventListener('resize', updateWindowWidth)

    useEffect(() => {
        updateWindowWidth()
        
    }, []);
    
    const allHours = state.map(hour => (
        <div 
            style={{width:`calc(100%/${hoursInSlider[sliderIndex]}`}} className="hours-weather__element"
        >
            <p>{hour.dt}</p>
        </div>
    ))

    return(
        <div className="container">
                {sliderIndex >= 2 && 
                <button  
                    className={`hours-weather__button ${move===minSliderMove? "hours-weather__button--disabled":""}`} 
                    style={{zIndex:1}} 
                    onClick={handleMoveLeft}>
                        {'<'}
                </button>}
            <div style={{overflow:`${sliderIndex >=2 ? "hidden":""}`}} className="hours-weather">
                <div 
                    style={{left:`-${move}%`, width:`${containerWidth[sliderIndex]}%`}} className="hours-weather__container"
                >
                    {allHours}
                </div>
            </div>
                {sliderIndex >= 2 &&
                <button 
                    className={`hours-weather__button ${move===maxSliderMove[sliderIndex]? "hours-weather__button--disabled":""}`} 
                    style={{zIndex:1}} onClick={handleMoveRight}>
                        {'>'}
                </button>}
        </div>
    )
}

export default NextHours;
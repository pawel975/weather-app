import React, {useState,useEffect, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './App.css';
import axios from 'axios';
import Main from '../Main/Main';
import Welcome from '../Welcome/Welcome';
import Dropdown from '../Dropdown/Dropdown';
import Quote from "../Quote/Quote";
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ModalDetails from '../ModalDetails/ModalDetails';

import { getData, setDataLoading } from '../../redux/actions/index'
import { formatTimestamp } from '../global-helpers/formatTimestamp';
import { formatToDate } from '../global-helpers/formatToDate';
import { isDayOrNight } from './isDayOrNight';
import { getWeatherStyling } from './getWeatherStyling';

function App() {

  const mainStateReducer = useSelector(state => state.mainStateReducer)
  const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
  const modalDetailsActive = useSelector(state => state.modalDetails)
  const dataLoading = useSelector(state => state.mainStateReducer.isDataLoading);

  const dispatch = useDispatch()
  const bgRef = useRef();

  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  })
  const [weatherIcon, setWeatherIcon] = useState();

  const exclude = "minutes";
  
  // Change App styling based on fetched data and time of the day
  const changeWeatherStyling = () => {

    const weatherStyling = getWeatherStyling(mainStateReducer, dayOrNight);
    bgRef.current.style.backgroundColor = weatherStyling.bgColor;
    setWeatherIcon(weatherStyling.icon);

  }
  
  useEffect(() => {
    console.log("render position")
    navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat:position.coords.latitude,
          long:position.coords.longitude,
      })
    })
  }, [])

  useEffect(() => {

      if(location.lat === 0) return

      console.log('render fetch API')
      const fetchData = () => {
        dispatch(setDataLoading(true)); 
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.long}&exclude=${exclude}&appid=${process.env.REACT_APP_API_KEY}`
      
        axios({
          method: 'get',
          url: URL,
        })
        .then(res=>{
          console.log(res.data);
          const data = res.data;
          dispatch(getData({
            temperature: (data.current.temp-273.15).toFixed(),
            weather: data.current.weather[0].description,
            feelsLike: (data.current.feels_like-273.15).toFixed(),
            sunrise: formatTimestamp(data.current.sunrise),
            sunset: formatTimestamp(data.current.sunset),
            pressure: data.current.pressure,
            clouds: data.current.clouds,
            visibility: data.current.visibility,
            wind_deg: data.current.wind_deg,
            wind_speed: data.current.wind_speed.toFixed(),
            hoursForecast: data.hourly,
            daysForecast: data.daily,
            detailsWeather: [],
            
          }));
          dispatch(setDataLoading(false)); 
        })
        .catch(err => console.error(`You have an error! - ${err}`))
        
      }
      setTimeout(fetchData,2000)

  }, [location])

  useEffect(()=> {
    if(dataLoading) return
    !dataLoading && changeWeatherStyling();
  },[dataLoading])

  // Checks if is day or night based on fetched sunrise time
  const dayOrNight = isDayOrNight(mainStateReducer);

  return (
    <>
      {modalDetailsActive && <ModalDetails/>}
      {!dataLoading &&
      <div ref={bgRef} className="app" >
        <Welcome formatToDate={formatToDate}/>
        <div className="app__main-content">
          {!dataLoading && <div className="app__weather-icon">
            <img src={weatherIcon} alt="" />
          </div>}
          {!isFilterSectionOpen && <Quote/>}
          {!dataLoading && <Main location={location}/>}
        </div>
        <Dropdown formatTimestamp={formatTimestamp} formatToDate={formatToDate}/>
      </div>
      }

      {dataLoading && 
        <LoadingScreen/>
      }

    </>
  )
}
export default App;
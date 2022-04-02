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

import { isDayOrNight } from '../global-helpers/isDayOrNight';
import { getWeatherStyling } from './getWeatherStyling';

function App() {

  // state
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
  
  console.log(mainStateReducer)

  // Change app styling based on fetched data and time of the day
  const changeWeatherStyling = () => {

    const currentTimestamp = new Date().getTime();
    const sunriseTimestamp = mainStateReducer.data[0].sunrise;
    const sunsetTimestamp = mainStateReducer.data[0].sunset;
    
    const dayOrNight = isDayOrNight(currentTimestamp, sunriseTimestamp, sunsetTimestamp);
    const weather = mainStateReducer.data[0].weather;

    const weatherStyling = getWeatherStyling(weather, dayOrNight);

    bgRef.current.style.background = weatherStyling.bgColor;
    setWeatherIcon(weatherStyling.icon);

  }
  
  // Get geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat:position.coords.latitude,
          long:position.coords.longitude,
      })
    })
  }, [])

  // Get weather data
  useEffect(() => {

      if(location.lat === 0) return

      const fetchData = () => {
        dispatch(setDataLoading(true)); 
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.long}&exclude=minutes&appid=${process.env.REACT_APP_API_KEY}`
      
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
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
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

  // Set styling
  useEffect(()=> {
    if(dataLoading) return
    !dataLoading && changeWeatherStyling();
  },[dataLoading])

  return (
    <>
      {modalDetailsActive && <ModalDetails/>}

      {!dataLoading &&
        <div ref={bgRef} className="app" >

          <Welcome/>

          <div className="app__main-content">
            {!dataLoading && <div className="app__weather-icon"><img src={weatherIcon} alt="" /></div>}
            {!isFilterSectionOpen && <Quote/>}
            {!dataLoading && <Main location={location}/>}
          </div>

          <Dropdown />

        </div>
      }

      {dataLoading && <LoadingScreen/>}

    </>
  )
}
export default App;
import React, {useState,useEffect, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './App.css';
import Main from '../Main/Main';
import Welcome from '../Welcome/Welcome';
import Dropdown from '../Dropdown/Dropdown';
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ModalDetails from '../ModalDetails/ModalDetails';

import { getData, setDataLoading } from '../../redux/actions/index'

import { isDayOrNight } from '../global-helpers/isDayOrNight';
import { getWeatherStyling } from '../global-helpers/getWeatherStyling';
import { kelvinToCelsius } from '../global-helpers/kelvinToCelsius';
import { fetchData } from './fetchData';

function App() {

  // state
  const mainStateReducer = useSelector(state => state.mainStateReducer)
  const modalDetailsActive = useSelector(state => state.modalDetails)
  const dataLoading = useSelector(state => state.mainStateReducer.isDataLoading);
  const dispatch = useDispatch()

  const bgRef = useRef();

  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  })
  const [weatherIcon, setWeatherIcon] = useState();
  
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

    if (location.lat === 0) return

    dispatch(setDataLoading(true)); 

    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.long}&exclude=minutes&appid=${process.env.REACT_APP_API_KEY}`

    fetchData(URL)
    .then(data => {
      dispatch(getData({
        temperature: kelvinToCelsius(data.current.temp),
        weather: data.current.weather[0].description,
        feelsLike: kelvinToCelsius(data.current.feels_like),
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

  }, [dispatch, location])

  // Change app styling based on fetched data and time of the day
  useEffect(() => {
    
    if(dataLoading) return
    
    const currentTimestamp = new Date().getTime() / 1000; // Convert ms to seconds
    const sunriseTimestamp = mainStateReducer.data[0].sunrise;
    const sunsetTimestamp = mainStateReducer.data[0].sunset;
    
    const dayOrNight = isDayOrNight(currentTimestamp, sunriseTimestamp, sunsetTimestamp);
    const weather = mainStateReducer.data[0].weather;

    const weatherStyling = getWeatherStyling(weather, dayOrNight);

    bgRef.current.style.background = weatherStyling.bgColor;
    setWeatherIcon(weatherStyling.icon);

  },[dataLoading, mainStateReducer.data])

  return (
    <>
      {modalDetailsActive && <ModalDetails/>}

      {!dataLoading &&

        <div ref={bgRef} className="app" >

          <Welcome/>
          {!dataLoading && <Main location={location} weatherIcon={weatherIcon} />}
          <Dropdown />

        </div>
      }

      {dataLoading && <LoadingScreen/>}

    </>
  )
}
export default App;
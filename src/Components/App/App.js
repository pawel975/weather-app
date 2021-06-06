import React, {useState,useEffect, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './App.css';
import axios from 'axios';
import Main from '../Main/Main';
import Nav from '../Nav/Nav';
import Dropdown from '../Dropdown/Dropdown';
import Quote from "../Quote/Quote";

import {getData,setDataLoading} from '../../redux/actions/index'

function App() {

  const isFilterSectionOpen = useSelector(state => state.isFilterSectionOpen);
  const dataLoading = useSelector(state => state.mainStateReducer.isDataLoading);
  const mainStateReducer = useSelector(state => state.mainStateReducer);
  const dispatch = useDispatch()

  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  })

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp*1000)
    const hours = "0" + date.getHours()
    const minutes = "0" + date.getMinutes()
    const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2)
    console.log(formattedTime)
    return formattedTime
  }

  const changeBackgroundStyle = () => {
    const sunriseHour = Number((mainStateReducer.data[0].sunrise).slice(0,2));
    const sunriseMinutes = Number((mainStateReducer.data[0].sunrise).slice(3,5));
    const sunsetHour = Number((mainStateReducer.data[0].sunset).slice(0,2));
    const sunsetMinutes = Number((mainStateReducer.data[0].sunset).slice(3,5));

    let currentHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes();

    let dayOrNight;

    if(currentHour === sunsetHour){
      if(currentMinutes < sunsetMinutes) {
        dayOrNight = "D";
      } else {
        dayOrNight = "N";
      }
    }
    else if(currentHour === sunriseHour){
      if(currentMinutes > sunriseMinutes) {
        dayOrNight = "D";
      } else {
        dayOrNight = "N";
      }
    }
    else if (sunriseHour < currentHour && currentHour < sunsetHour) {
      dayOrNight = "D";
    } 
    else {
      dayOrNight = "N";
    }

    console.log(dayOrNight)

    // console.log(sunsetHour,sunsetMinutes, typeof sunsetHour, typeof currentHour);

     switch (mainStateReducer.data[0].weather) {
      case 'clear sky':
          bgTest.current.style.background = weatherBackgroundColors[`clearSky${dayOrNight}`]
        break;
      default:
        break;
    }
  }

  const exclude = "minutes";
  // const [newTime, setNewTime] = useState(null)

  const bgTest = useRef()


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
          visibility: data.current.visibiliy,
        }));
        dispatch(setDataLoading(false)); 

      })
      .catch(err => console.error(`You have an error! - ${err}`))
      
      !dataLoading && changeBackgroundStyle();
    }
    setTimeout(fetchData,2000)

}, [location])


// const getCurrentTime = () => {
//   clearInterval(interval)
//   const date = new Date();
//   const hours = "0" + date.getHours()
//   const minutes = "0" + date.getMinutes()
//   const seconds = "0" + date.getSeconds()
//   const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//   interval = setInterval(getCurrentTime,2000)
//   setNewTime(formattedTime)
//   // return formattedTime
// }

// let interval = setInterval(getCurrentTime,1000)

// const WeatherHours = state.hours.map(hour => (
//   <>
//     <h2>{(hour.temp-273.15).toFixed(0)}</h2>
//     <br/>
//   </>
// ))


const weatherBackgroundColors = {
  clearSkyD: `linear-gradient(45deg,rgba(137, 219, 224,1),rgba(137, 219, 224,0))`,
  clearSkyN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  fewCloudsD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  fewCloudsN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  scatteredCloudsD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  scatteredCloudsN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  brokenCloudsD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  brokenCloudsN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  showerRainD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  showerRainN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  rainD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  rainN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  thunderstormD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  thunderstormN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  snowD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  snowN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  mistD: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  mistN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,

}


return (
  <div ref={bgTest} className="app" >
    <Nav/>
    <div  className="app__main-content">
      <div className="app__weather-icon" ></div>
      {!isFilterSectionOpen && <Quote/>}
      {!dataLoading && <Main/>}
    </div>
    <Dropdown/>
  </div>
  )
}

export default App;
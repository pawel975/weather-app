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

  const [weatherIcon, setWeatherIcon] = useState("clear-sky-d")

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

     switch (mainStateReducer.data[0].weather) {
      case 'clear sky':
          bgRef.current.style.background = weatherBackgroundColors[`clearSky${dayOrNight}`]
        break;
      case 'few clouds':
          bgRef.current.style.background = weatherBackgroundColors[`fewClouds${dayOrNight}`]
        break;
      case 'scattered clouds':
          bgRef.current.style.background = weatherBackgroundColors[`scatteredClouds${dayOrNight}`]
        break;
      case 'broken clouds':
          bgRef.current.style.background = weatherBackgroundColors[`brokenClouds${dayOrNight}`]
        break;
      case 'shower rain':
          bgRef.current.style.background = weatherBackgroundColors[`showerRain${dayOrNight}`]
        break;
      case 'rain':
          bgRef.current.style.background = weatherBackgroundColors[`rain${dayOrNight}`]
        break;
      case 'thunderstorm':
          bgRef.current.style.background = weatherBackgroundColors[`thunderstorm${dayOrNight}`]
        break;
      case 'snow':
          bgRef.current.style.background = weatherBackgroundColors[`snow${dayOrNight}`]
        break;
      case 'mist':
          bgRef.current.style.background = weatherBackgroundColors[`mist${dayOrNight}`]
        break;
      default:
        break;
    }
  }

  const exclude = "minutes";
  // const [newTime, setNewTime] = useState(null)

  const bgRef = useRef()


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
      
      
    }
    setTimeout(fetchData,2000)

}, [location])

useEffect(()=> {
  if(dataLoading) return
  !dataLoading && changeBackgroundStyle();
},[dataLoading])


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
  clearSkyD: `linear-gradient(45deg,rgba(126, 214, 236,1),rgba(126, 214, 236,0.35))`,
  clearSkyN: `linear-gradient(45deg,rgba(53, 55, 81, 1),rgba(53, 55, 81, 0.85))`,
  fewCloudsD: `linear-gradient(45deg,rgba(126, 214, 236,1),rgba(126, 214, 236,0.35))`,
  fewCloudsN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  scatteredCloudsD: `linear-gradient(45deg,rgba(203, 226, 232,1),rgba(203, 226, 232,0.35))`,
  scatteredCloudsN:`linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  brokenCloudsD: `linear-gradient(45deg,rgba(194, 198, 199,1),rgba(194, 198, 199,0.35))`,
  brokenCloudsN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  showerRainD: `linear-gradient(45deg,rgba(194, 198, 199,1),rgba(194, 198, 199,0.35))`,
  showerRainN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  rainD: `linear-gradient(45deg,rgba(194, 198, 199,1),rgba(194, 198, 199,0.35))`,
  rainN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  thunderstormD: `linear-gradient(45deg,rgba(148, 148, 148, 1),rgba(148, 148, 148, 0.85))`,
  thunderstormN: `linear-gradient(45deg,rgba(44, 52, 62, 1),rgba(44, 52, 62, 0.85))`,
  snowD: `linear-gradient(45deg,rgba(173, 195, 212,1),rgba(173, 195, 212,0.35))`,
  snowN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,
  mistD: `linear-gradient(45deg,rgba(195, 205, 212,1),rgba(195, 205, 212,0.35))`,
  mistN: `linear-gradient(45deg,rgba(37, 38, 54, 1),rgba(37, 38, 54, 0.85))`,

}


return (
  <div ref={bgRef} className="app" >
    <Nav/>
    <div  className="app__main-content">
      <div className="app__weather-icon" ><img src="../../../assets/my_assets/animated/clear-sky-d.svg" alt="" /> </div>
      {!isFilterSectionOpen && <Quote/>}
      {!dataLoading && <Main/>}
    </div>
    <Dropdown/>
  </div>
  )
}

export default App;
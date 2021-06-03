import React, {useEffect } from 'react';
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
  const dispatch = useDispatch()

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp*1000)
    const hours = "0" + date.getHours()
    const minutes = "0" + date.getMinutes()
    const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2)
    console.log(formattedTime)
    return formattedTime
  }

  let lat;
  let long;
  const exclude = "minutes";
  // const [newTime, setNewTime] = useState(null)

 

useEffect(() => {

  console.log("render weather info")
  navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat,long);
    })

    const fetchData = () => {
      dispatch(setDataLoading(true)); 
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${process.env.REACT_APP_API_KEY}`
    
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
        }));
        dispatch(setDataLoading(false)); 
      })
      .catch(err => console.error(`Can't fetch the data from API - ${err}`))

    }
    


    setTimeout(fetchData,2000)


}, [])


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



return (
  <div className="app">
    <Nav/>
    <div className="app__main-content">
      <div className="app__weather-icon" ></div>
      {!isFilterSectionOpen && <Quote/>}
      {!dataLoading && <Main/>}
    </div>
    <Dropdown/>
  </div>
  )
}

export default App;
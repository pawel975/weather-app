import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Main from '../Main/Main';
import Nav from '../Nav/Nav';
import Dropdown from '../Dropdown/Dropdown';


function App() {

//   let lat;
//   let long;
//   const exclude = "minutes";
//   const [newTime, setNewTime] = useState(null)
//   const [state,setState] = useState({
//     currently: [],
//     days: [],
//     hours: [],
//   });
  


// useEffect(() => {

//   console.log("render")
//   navigator.geolocation.getCurrentPosition(position => {
//       lat = position.coords.latitude;
//       long = position.coords.longitude;
//       console.log(lat,long);
//     })

//     const fetchData = () => {

//       const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${process.env.REACT_APP_API_KEY}`
    
//       axios({
//         method: 'get',
//         url: URL,
//       })
//       .then(res=>{
//         console.log(res.data);
//         setState({
//         ...state,
//         currently: res.data.current,
//         days: res.data.daily,
//         hours: res.data.hourly,
//         });
//       })
//       .catch(err => console.error(`Can't fetch the data from API - ${err}`))

//     }


//     setTimeout(fetchData,2000)


// }, [])


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
    <div className="weather-icon" ></div>
    <Nav/>
    <Main/>
    <Dropdown/>
  </div>
  )
}

export default App;
import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  let lat;
  let long;
  const exclude = "minutes";
  const [state,setState] = useState({
    currently: [],
    days: [],
    hours: [],
  });
  


useEffect(() => {

  console.log("render")
  navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat,long);
    })

    const fetchData = () => {

      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${process.env.REACT_APP_API_KEY}`
    
      axios({
        method: 'get',
        url: URL,
      })
      .then(res=>{
        console.log(res.data);
        setState({
        ...state,
        currently: res.data.current,
        days: res.data.daily,
        hours: res.data.hourly,
        });
      })
      .catch(err => console.error(`Can't fetch the data from API - ${err}`))

    }


    setTimeout(fetchData,2000)


}, [])


const getCurrentTime = () => {

  const unix_timestamp = state.currently.dt
  const date = new Date(unix_timestamp*1000);
  const hours = "0" + date.getHours()
  const minutes = "0" + date.getMinutes()
  const seconds = "0" + date.getSeconds()
  const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime
}

const WeatherHours = state.hours.map(hour => (
  <>
    <h2>{(hour.temp-273.15).toFixed(0)}</h2>
    <br/>
  </>
))



return (
  <div className="app">
    {"test"}
  {getCurrentTime()}
      {/* {WeatherHours} */}
    </div>
  )
}

export default App;
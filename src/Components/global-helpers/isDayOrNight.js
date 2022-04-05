
export const isDayOrNight = (thisTimestamp, sunriseTimestamp, sunsetTimestamp) => {

  const thisHour = new Date(thisTimestamp * 1000).getHours();
  const thisMinutes = new Date(thisTimestamp * 1000).getMinutes();

  const sunriseHour = new Date(sunriseTimestamp * 1000).getHours();
  const sunriseMinutes = new Date(sunriseTimestamp * 1000).getMinutes();
  const sunsetHour = new Date(sunsetTimestamp * 1000).getHours();
  const sunsetMinutes = new Date(sunsetTimestamp * 1000).getHours();

  let isDayOrNight;

  if(thisHour === sunsetHour){
    if(thisMinutes < sunsetMinutes) {
      isDayOrNight = "D";
    } else {
      isDayOrNight = "N";
    }
  }
  else if(thisHour === sunriseHour){
    if(thisMinutes > sunriseMinutes) {
      isDayOrNight = "D";
    } else {
      isDayOrNight = "N";
    }
  }
  else if (sunriseHour < thisHour && thisHour < sunsetHour) {
    isDayOrNight = "D";
  } 
  else {
    isDayOrNight = "N";
  }

  return isDayOrNight;

}

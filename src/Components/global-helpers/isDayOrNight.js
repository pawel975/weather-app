
export const isDayOrNight = (thisTimestamp, sunriseTimestamp, sunsetTimestamp) => {

  const thisHour = new Date(thisTimestamp).getHours();
  const thisMinutes = new Date(thisTimestamp).getHours();

  const sunriseHour = new Date(sunriseTimestamp).getHours();
  const sunriseMinutes = new Date(sunriseTimestamp).getMinutes();
  const sunsetHour = new Date(sunsetTimestamp).getHours();
  const sunsetMinutes = new Date(sunsetTimestamp).getHours();

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


export const isDayOrNight = (state) => {

    const sunriseHour = Number((state.data[0].sunrise).slice(0,2));
    const sunriseMinutes = Number((state.data[0].sunrise).slice(3,5));
    const sunsetHour = Number((state.data[0].sunset).slice(0,2));
    const sunsetMinutes = Number((state.data[0].sunset).slice(3,5));

    let currentHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes();

    let isDayOrNight;

    if(currentHour === sunsetHour){
      if(currentMinutes < sunsetMinutes) {
        isDayOrNight = "D";
      } else {
        isDayOrNight = "N";
      }
    }
    else if(currentHour === sunriseHour){
      if(currentMinutes > sunriseMinutes) {
        isDayOrNight = "D";
      } else {
        isDayOrNight = "N";
      }
    }
    else if (sunriseHour < currentHour && currentHour < sunsetHour) {
      isDayOrNight = "D";
    } 
    else {
      isDayOrNight = "N";
    }

    return isDayOrNight;
}

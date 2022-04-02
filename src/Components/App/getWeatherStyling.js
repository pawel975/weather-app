import { animatedAssets } from "../global-helpers/animatedAssets"
import { weatherBackgroundColors } from "./weatherBackgroundColors"

 const {ClearSkyD, ClearSkyN, FewCloudsD, FewCloudsN, ScatteredCloudsD, ScatteredCloudsN, BrokenCloudsD, BrokenCloudsN, ShowerRainD, ShowerRainN, RainD, RainN, ThunderstormD, ThunderstormN, SnowD, SnowN, MistD, MistN} = animatedAssets

export const getWeatherStyling = (state, dayOrNight) => {

    let bgColor;
    let icon;

    switch (state.data[0].weather) {
        case 'clear sky':
            bgColor = weatherBackgroundColors[`clearSky${dayOrNight}`]
            icon = dayOrNight ==="D"? ClearSkyD:ClearSkyN
          break;
        case 'few clouds':
        case 'few clouds: 11-25%':
            bgColor = weatherBackgroundColors[`fewClouds${dayOrNight}`]
            icon = dayOrNight ==="D"? FewCloudsD:FewCloudsN
          break;
        case 'scattered clouds': 
        case 'scattered clouds: 25-50%': 
            bgColor = weatherBackgroundColors[`scatteredClouds${dayOrNight}`]
            icon = dayOrNight ==="D"? ScatteredCloudsD:ScatteredCloudsN
          break;
        case 'broken clouds':
        case 'broken clouds: 51-84%':
        case 'overcast clouds':
        case 'overcast clouds: 85-100%':
            bgColor = weatherBackgroundColors[`brokenClouds${dayOrNight}`]
            icon = dayOrNight ==="D"? BrokenCloudsD:BrokenCloudsN
          break;
        case 'shower rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
        case 'heavy intensity shower rain':
        case 'ragged shower rain':
        case 'heavy shower rain and drizzle':
        case 'shower drizzle':
            bgColor = weatherBackgroundColors[`showerRain${dayOrNight}`]
            icon = dayOrNight ==="D"? ShowerRainD:ShowerRainN
          break;
        case 'light rain':
        case 'moderate rain':
        case 'light intensity shower rain':
        case 'light intensity drizzle':
        case 'drizzle':
        case 'heavy intensity drizzle':
        case 'light intensity drizzle rain':
        case 'drizzle rain':
        case 'heavy intensity drizzle rain':
        case 'shower rain and drizzle':
            bgColor = weatherBackgroundColors[`rain${dayOrNight}`]
            icon = dayOrNight ==="D"? RainD:RainN
          break;
        case 'thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
            bgColor = weatherBackgroundColors[`thunderstorm${dayOrNight}`]
            icon = dayOrNight ==="D"? ThunderstormD:ThunderstormN
          break;
        case 'Snow':
        case 'freezing rain':
        case 'Heavy snow':
        case 'Sleet':
        case 'Light shower sleet':
        case 'Shower sleet':
        case 'Light rain and snow':
        case 'Rain and snow':
        case 'Light shower snow':
        case 'Shower snow':
        case 'Heavy shower snow':
            bgColor = weatherBackgroundColors[`snow${dayOrNight}`]
            icon = dayOrNight ==="D"? SnowD:SnowN
          break;
        case 'mist':
        case 'Smoke':
        case 'Haze':
        case 'sand/ dust whirls':
        case 'fog':
        case 'sand':
        case 'dust':
        case 'volcanic ash':
        case 'squalls':
        case 'tornado':
            bgColor = weatherBackgroundColors[`mist${dayOrNight}`]
            icon = dayOrNight ==="D"? MistD:MistN
          break;
        default:
            bgColor = weatherBackgroundColors[`clearSky${dayOrNight}`]
            icon = dayOrNight ==="D"? ClearSkyD:ClearSkyN
          break;
      }

      return {
          bgColor,
          icon,
      }
}
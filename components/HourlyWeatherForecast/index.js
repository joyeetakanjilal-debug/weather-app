import {FaCloudSun} from 'react-icons/fa'
import {FaSun} from 'react-icons/fa'
import {MdFoggy} from 'react-icons/md'
import {CiCloudDrizzle} from 'react-icons/ci'
import {IoMdRainy} from 'react-icons/io'
import {IoRainySharp} from 'react-icons/io5'
import {GiHeavyRain} from 'react-icons/gi'
import {BsCloudSnowFill} from 'react-icons/bs'
import {WiNightSnowThunderstorm} from 'react-icons/wi'
import {BsCloudLightningRain} from 'react-icons/bs'
import {WiDaySnowThunderstorm} from 'react-icons/wi'

import './index.css'

const HourlyWeatherForecast = props => {
  const {hourlyWeatherForecastInfo} = props
  const {temperature, rainProbability, feelsLike, humidity, time, weatherCode} =
    hourlyWeatherForecastInfo

  const hourlyData = temperature.map((temp, index) => ({
    currentTemp: temp,
    chanceOfRain: rainProbability[index],
    apparentTemp: feelsLike[index],
    currentTime: time[index],
    weather: weatherCode[index],
    currentHumidity: humidity[index],
  }))

  const climateImage = code => {
    switch (code) {
      case 0:
      case 1:
        return <FaSun size={15} color="#ffffff" />

      case 2:
      case 3:
        return <FaCloudSun size={15} color="#ffffff" />

      case 45:
      case 48:
        return <MdFoggy size={15} color="#ffffff" />

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return <CiCloudDrizzle size={15} color="#ffffff" />

      case 80:
      case 81:
      case 61:
      case 63:
        return <IoMdRainy size={15} color="#ffffff" />

      case 65:
        return <IoRainySharp size={15} color="#ffffff" />

      case 82:
      case 66:
      case 67:
        return <GiHeavyRain size={15} color="#ffffff" />

      case 71:
      case 73:
      case 75:
      case 77:
        return <BsCloudSnowFill size={15} color="#ffffff" />

      case 85:
      case 86:
        return <WiNightSnowThunderstorm size={15} color="#ffffff" />

      case 95:
      case 96:
        return <BsCloudLightningRain size={15} color="#ffffff" />

      case 97:
      case 99:
        return <WiDaySnowThunderstorm size={15} color="#ffffff" />

      default:
        return null
    }
  }

  return (
    <div className="hourly-forecast-main-container">
      <h1 className="hourly-forecast-main-heading">HOURLY WEATHER FORECAST</h1>
      {hourlyData.map(each => {
        return (
          <div className="hourly-forecast-sub-container">
            <div className="hourly-forecast-mini-container">
              <h1 className="hourly-forecast-time">{each.currentTime}</h1>
              <div className="hourly-forecast-mini-container">
                <h1 className="hourly-forecast-weather">
                  {each.currentTemp} °C
                </h1>
                {climateImage(each.weather)}
              </div>
            </div>
            <div className="hourly-forecast-mini-container">
              <p className="hourly-forecast-para">{each.apparentTemp}°C</p>
              <p className="hourly-forecast-para">
                Humidity {each.currentHumidity}%
              </p>
              <p className="hourly-forecast-para">
                {each.chanceOfRain}% chance of rain
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HourlyWeatherForecast

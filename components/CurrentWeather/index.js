import {FaLocationDot} from 'react-icons/fa6'
import {LuSunrise} from 'react-icons/lu'
import {FiSunset} from 'react-icons/fi'
import {WiMoonrise} from 'react-icons/wi'
import {WiMoonset} from 'react-icons/wi'
import {WiHumidity} from 'react-icons/wi'
import {BsThermometerSun} from 'react-icons/bs'
import {LuWind} from 'react-icons/lu'
import {FaCloudSun} from 'react-icons/fa'
import {MdOutlineVisibility} from 'react-icons/md'
import {TbUvIndex} from 'react-icons/tb'
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

const CurrentWeather = props => {
  const {dailyInfo, currentInfo, coordinateData} = props
  const {moonrise, moonset, sunrise, sunset} = dailyInfo
  const {
    apparentTemp,
    cloudCover,
    relativeHumidity,
    pressure,
    temperature,
    windSpeed,
    weatherCode,
    visibility,
  } = currentInfo

  const {country, name} = coordinateData

  const climateImage = code => {
    switch (code) {
      case 0:
      case 1:
        return <FaSun size={80} color="#ffffff" />

      case 2:
      case 3:
        return <FaCloudSun size={80} color="#ffffff" />

      case 45:
      case 48:
        return <MdFoggy size={80} color="#ffffff" />

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return <CiCloudDrizzle size={80} color="#ffffff" />

      case 80:
      case 81:
      case 61:
      case 63:
        return <IoMdRainy size={80} color="#ffffff" />

      case 65:
        return <IoRainySharp size={80} color="#ffffff" />

      case 82:
      case 66:
      case 67:
        return <GiHeavyRain size={80} color="#ffffff" />

      case 71:
      case 73:
      case 75:
      case 77:
        return <BsCloudSnowFill size={80} color="#ffffff" />

      case 85:
      case 86:
        return <WiNightSnowThunderstorm size={80} color="#ffffff" />

      case 95:
      case 96:
        return <BsCloudLightningRain size={80} color="#ffffff" />

      case 97:
      case 99:
        return <WiDaySnowThunderstorm size={80} color="#ffffff" />

      default:
        return <p>An Error Occured</p>
    }
  }

  const climateStatus = code => {
    switch (code) {
      case 0:
      case 1:
        return 'Clear Sky'

      case 2:
      case 3:
        return 'Cloudy'

      case 45:
      case 48:
        return 'Fog'

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return 'Drizzle'

      case 80:
      case 81:
      case 61:
      case 63:
        return 'Slight Rain'

      case 65:
        return 'Moderate Rain'

      case 82:
      case 66:
      case 67:
        return 'Heavy Rain'

      case 71:
      case 73:
      case 75:
      case 77:
        return 'Snow Fall'

      case 85:
      case 86:
        return 'Heavy Snow Showers'

      case 95:
      case 96:
        return 'Thunderstorm'

      case 97:
      case 99:
        return 'Thunderstorm With Heavy Hail'

      default:
        return <p>An Error Occured</p>
    }
  }

  return (
    <div className="current-weather-main-container">
      <div className="current-temperature-container">
        {climateImage(weatherCode)}
        <div className="current-temperature-sub-container">
          <h1 className="current-termperature-para">{temperature}°C</h1>

          <div className="current-weather-mini-container">
            <TbUvIndex className="uv-icon" />
            <p className="current-uvindex">{climateStatus(weatherCode)}</p>
          </div>

          <div className="current-weather-mini-container">
            <FaLocationDot className="location-icon" />
            <p className="city-and-country">
              {name}, {country}
            </p>
          </div>
        </div>
      </div>
      <div className="additional-temperature-main-container">
        <div className="additional-temperature-sub-container">
          <div className="additional-temperature-container">
            <div className="additional-temperature-mini-container">
              <BsThermometerSun className="thermometer-icon" />
              <p className="additional-temperature-para">
                Feels Like {apparentTemp}°C
              </p>
            </div>
            <div className="additional-temperature-mini-container">
              <WiHumidity className="humidity-icon" />
              <p className="additional-temperature-para">
                Humidity {relativeHumidity}%
              </p>
            </div>
          </div>
          <div className="additional-temperature-container">
            <div className="additional-temperature-mini-container">
              <LuWind className="icons" />
              <p className="additional-temperature-para">
                Wind speed {windSpeed}km/h
              </p>
            </div>
            <div className="additional-temperature-mini-container">
              <MdOutlineVisibility className="icons" />
              <p className="additional-temperature-para">
                Visibility {visibility}m
              </p>
            </div>
          </div>
          <div className="additional-temperature-container">
            <div className="additional-temperature-mini-container">
              <p className="additional-temperature-para">
                Surface pressure {pressure}Pa
              </p>
            </div>
            <div className="additional-temperature-mini-container">
              <FaCloudSun className="icons" />
              <p className="additional-temperature-para">
                Cloud coverage {cloudCover}%
              </p>
            </div>
          </div>
        </div>
        <div className="time-main-container">
          <div className="time-container">
            <div className="time-sub-container">
              <LuSunrise className="sun-icons" />
              <p className="time-para">Sunrise {sunrise}</p>
            </div>
            <div className="time-sub-container">
              <FiSunset className="sun-icons" />
              <p className="time-para">Sunset {sunset}</p>
            </div>
          </div>
          <div className="time-container">
            <div className="time-sub-container">
              <WiMoonrise className="moon-icons" />
              <p className="time-para">Moonrise {moonrise}</p>
            </div>
            <div className="time-sub-container">
              <WiMoonset className="moon-icons" />
              <p className="time-para">Moonset {moonset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather

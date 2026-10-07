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

const WeeklyWeatherForecast = props => {
  const {weeklyWeatherForcastInfo} = props
  const {minTemperature, maxTemperature, weatherCode, days} =
    weeklyWeatherForcastInfo

  const climateImage = code => {
    switch (code) {
      case 0:
      case 1:
        return <FaSun size={40} color="#ffffff" />

      case 2:
      case 3:
        return <FaCloudSun size={40} color="#ffffff" />

      case 45:
      case 48:
        return <MdFoggy size={40} color="#ffffff" />

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return <CiCloudDrizzle size={40} color="#ffffff" />

      case 80:
      case 81:
      case 61:
      case 63:
        return <IoMdRainy size={40} color="#ffffff" />

      case 65:
        return <IoRainySharp size={40} color="#ffffff" />

      case 82:
      case 66:
      case 67:
        return <GiHeavyRain size={40} color="#ffffff" />

      case 71:
      case 73:
      case 75:
      case 77:
        return <BsCloudSnowFill size={40} color="#ffffff" />

      case 85:
      case 86:
        return <WiNightSnowThunderstorm size={40} color="#ffffff" />

      case 95:
      case 96:
        return <BsCloudLightningRain size={40} color="#ffffff" />

      case 97:
      case 99:
        return <WiDaySnowThunderstorm size={40} color="#ffffff" />

      default:
        return null
    }
  }

  const weeklyTemperatureData = maxTemperature.map((temp, index) => ({
    day: days[index],
    maxTemp: temp,
    minTemp: minTemperature[index],
    weather: weatherCode[index],
  }))

  const allTemperatures = [...maxTemperature, ...minTemperature]

  const lowestTemperature = Math.min(...allTemperatures)
  const highestTemperature = Math.max(...allTemperatures)

  const graphTop = 170
  const graphBottom = 330
  const graphHeight = graphBottom - graphTop

  const getY = temperature => {
    if (highestTemperature === lowestTemperature) {
      return 125
    }

    return (
      graphBottom -
      ((temperature - lowestTemperature) /
        (highestTemperature - lowestTemperature)) *
        graphHeight
    )
  }

  const getX = index => {
    const graphWidth = 1000
    const margin = 50
    const numberOfDays = weeklyTemperatureData.length

    return margin + (index * graphWidth) / (numberOfDays - 1)
  }

  const maxPoints = weeklyTemperatureData
    .map((item, index) => `${getX(index)},${getY(item.maxTemp)}`)
    .join(' ')

  const minPoints = weeklyTemperatureData
    .map((item, index) => `${getX(index)},${getY(item.minTemp)}`)
    .join(' ')

  return (
    <div className="weather-forecast-container">
      <h1 className="weather-forecast-heading">WEEKLY WEATHER FORECAST</h1>
    
      <svg
        width="950"
        height="360"
        viewBox="0 0 950 360"
        preserveAspectRatio="xMinYMid meet"
      >
        <g>
          <circle cx="270" cy="15" r="5" fill="#f04646" />

          <text x="280" y="20" fill="#ffffff" fontSize="13">
            Max Temperature
          </text>

          <circle cx="430" cy="15" r="5" fill="#a3f571" />

          <text x="440" y="20" fill="#ffffff" fontSize="13">
            Min Temperature
          </text>
        </g>

        <polyline
          points={maxPoints}
          fill="none"
          stroke="#f04646"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polyline
          points={minPoints}
          fill="none"
          stroke="#a3f571"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {weeklyTemperatureData.map((item, index) => {
          const x = getX(index)
          const maxY = getY(item.maxTemp)
          const minY = getY(item.minTemp)

          return (
            <g key={item.day}>
              <text
                x={x}
                y="65"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
              >
                {item.day}
              </text>

              
              <g transform={`translate(${x - 20}, 75)`}>
                {climateImage(item.weather)}
              </g>

              <text
                x={x}
                y={maxY - 12}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
              >
                {item.maxTemp}°
              </text>

              <circle cx={x} cy={maxY} r="6" fill="#ffffff" />

              <text
                x={x}
                y={minY + 22}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
              >
                {item.minTemp}°
              </text>

              <circle cx={x} cy={minY} r="6" fill="#ffffff" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default WeeklyWeatherForecast

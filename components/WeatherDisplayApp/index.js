import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'

import Header from '../Header'
import CurrentWeather from '../CurrentWeather'
import WeeklyWeatherForecast from '../WeeklyWeatherForecast'
import HourlyWeatherForecast from '../HourlyWeatherForecast'

import './index.css'

class WeatherDisplayApp extends Component {
  state = {
    searchInput: 'Delhi',
    coordinateData: {},
    dailyInfo: {},
    currentInfo: {},
    weeklyWeatherForcastInfo: {},
    dailyWeatherForecastInfo: {},
    isLoading: true,
  }

  componentDidMount() {
    const {searchInput} = this.state
    this.getCoordinates(searchInput)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitForm = event => {
    const {searchInput} = this.state
    event.preventDefault()
    this.getCoordinates(searchInput)
  }

  getCoordinates = async city => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    const coordinateDetails = fetchedData.results[0]
    const formattedData = {
      latitude: coordinateDetails.latitude,
      longitude: coordinateDetails.longitude,
      country: coordinateDetails.country,
      name: coordinateDetails.name,
    }

    this.setState({coordinateData: formattedData})
    this.getWeatherDetails(formattedData)
  }

  getWeatherDetails = async coordinates => {
    const {latitude, longitude} = coordinates
    const selectedLatitude = parseFloat(latitude)
    const selectedLongitude = parseFloat(longitude)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLatitude}&longitude=${selectedLongitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,moonset,moonrise,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,cloud_cover,surface_pressure&minutely_15=visibility&forecast_days=7`

    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    const dailyData = fetchedData.daily
    const currentData = fetchedData.current
    const visibilityData = fetchedData.minutely_15
    const hourlyData = fetchedData.hourly

    const daysList = dailyData.time.map(eachDate => {
      const dateObject = new Date(eachDate)
      return dateObject.toLocaleDateString('en-US', {weekday: 'long'})
    })

    this.setState({
      dailyInfo: {
        moonrise: dailyData.moonrise[0].split('T')[1],
        moonset: dailyData.moonset[0].split('T')[1],
        sunrise: dailyData.sunrise[0].split('T')[1],
        sunset: dailyData.sunset[0].split('T')[1],
      },
      currentInfo: {
        apparentTemp: currentData.apparent_temperature,
        cloudCover: currentData.cloud_cover,
        relativeHumidity: currentData.relative_humidity_2m,
        pressure: currentData.surface_pressure,
        temperature: currentData.temperature_2m,
        windSpeed: currentData.wind_speed_10m,
        weatherCode: currentData.weather_code,
        visibility: visibilityData.visibility[0],
      },
      weeklyWeatherForcastInfo: {
        maxTemperature: dailyData.temperature_2m_max,
        minTemperature: dailyData.temperature_2m_min,
        weatherCode: dailyData.weather_code,
        days: daysList,
      },
      hourlyWeatherForecastInfo: {
        temperature: hourlyData.temperature_2m.slice(0, 10),
        rainProbability: hourlyData.precipitation_probability.slice(0, 10),
        feelsLike: hourlyData.apparent_temperature.slice(0, 10),
        humidity: hourlyData.relative_humidity_2m.slice(0, 10),
        time: hourlyData.time
          .slice(0, 10)
          .map(eachTime => eachTime.split('T')[1]),
        weatherCode: hourlyData.weather_code.slice(0, 10),
      },
      isLoading: false,
    })
  }

  render() {
    const {
      searchInput,
      dailyInfo,
      currentInfo,
      coordinateData,
      weeklyWeatherForcastInfo,
      hourlyWeatherForecastInfo,
      isLoading,
    } = this.state
    return (
      <>
        {isLoading ? (
          <div>
            <ThreeDots height={50} width={50} color="#ffffff" />
          </div>
        ) : (
          <div className="weather-display-container">
            <Header />
            <div className="weather-display-sub-container">
              <div className="weather-display-sub-sub-container">
                <form className="search-container" onSubmit={this.onSubmitForm}>
                  <input
                    type="text"
                    placeholder="Search City"
                    className="input"
                    value={searchInput}
                    onChange={this.onChangeInput}
                  />
                  <button className="search-button" type="submit">
                    Search
                  </button>
                </form>
                <div className="weather-display-mini-container">
                  <CurrentWeather
                    dailyInfo={dailyInfo}
                    currentInfo={currentInfo}
                    coordinateData={coordinateData}
                  />
                  <WeeklyWeatherForecast
                    weeklyWeatherForcastInfo={weeklyWeatherForcastInfo}
                  />
                </div>
              </div>
              <HourlyWeatherForecast
                hourlyWeatherForecastInfo={hourlyWeatherForecastInfo}
              />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default WeatherDisplayApp

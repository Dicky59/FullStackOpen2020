import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, setSearch }) => {
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      Find countries
      <input value={search} onChange={handleChange} />
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios.get(url).then(response => {
      console.log(response.data)
      setWeather(response.data.current)
    })
  },)

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width={150} alt="flag" />
      <div>
        <Weather weather={weather} city={country.capital} />
      </div>
    </div>

    
  
  )
}

const Weather = ({ capital, weather }) => {
  console.log(weather)
  if (!weather) {
    return null
  }
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>
        <strong>Temperature:</strong> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
      <div>
        <strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

const Countries = ({ countries, setSearch }) => {

  if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  }

  if (countries.length < 10) {
    return(
      <div>
        {countries.map(country =>
          <div key={country.alpha2Code}>
            {country.name}
            <button onClick={() => setSearch(country.name)}>
              Show
            </button>
          </div>
        )}
      </div>
    )
}
  return (
    <div>Too many matches, specify another filter</div>
  )}

  const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
  
    useEffect(() => {
      axios.get('https://restcountries.eu/rest/v2/all').then((resp) => {
        setCountries(resp.data)
      })
    }, [])
  
    const Filtered = filter.length === 1 ?
      countries :
      countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
    return (
      <div>
        <Search value={filter} setSearch={setFilter}/>
        <Countries countries={Filtered} setSearch={setFilter}/>
      </div>
    )
  }

export default App
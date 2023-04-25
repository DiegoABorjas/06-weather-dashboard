const API_KEY = 'edf5c7e48b6700fcd68b1d783895a106'

// Use Geocoding API to get coordinates from city
function fetchCoordinates(city) {
    var GEO_CODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`

    return fetch(GEO_CODING_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');
            return res.json();
        })
        .then(function (data) {
            return [data[0].lat, data[0].lon];
        })
    
    
}

// Function to fetch current weather from API
function fetchCurrentWeather(lat, lon) {
    var FORECAST_API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    return fetch(FORECAST_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
}

// Function to fetch weather forecast from API
function fetchWeatherForecast(lat, lon) {
    var FORECAST_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${API_KEY}`

    return fetch(FORECAST_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
}

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
    var searchInput = document.getElementById('searchInput');

    if (!searchInput.value.trim()) return;

    fetchCoordinates(searchInput.value).then(function (coords) {
        var lat = coords[0]
        var lon = coords[1]
        fetchCurrentWeather(lat, lon).then(function (data) {
            renderCurrentWeather(data)
        })
        fetchWeatherForecast(lat, lon).then(function (data) {
            renderWeatherForecast(data)
        })
    });
})

// Function to render the current results to the page
function renderCurrentWeather(city) {
    var today = dayjs()
    var cityDate = document.getElementById('city-date')
    var weatherIcon = document.getElementById('weather-icon')
    var currentTemp = document.getElementById('temp')
    var currentWind = document.getElementById('wind')
    var currentHumidity = document.getElementById('humidity')
    cityDate.textContent = city.name + ` (${today.format('DD/MM/YYYY')})`
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${city.weather[0].icon}.png`) 
    currentTemp.textContent = `Temp: ${city.main.temp}`
    currentWind.textContent = `Wind: ${city.wind.speed} MPH`
    currentHumidity.textContent = `Humidity: ${city.main.humidity}%`
}

// Function to render the weather forecast results to the page
function renderWeatherForecast(forecast) {
    var date = dayjs()    
    var forecastTitle = document.getElementById('forecast-title')
    var forecastCard = document.getElementById('forecast-cards')
    var forecastSection = document.getElementById('forecastSection')

    forecastTitle.textContent = '5-Day Forecast:'

    for (var i=3; i<forecast.list.length; i+=8) {
        var cardEl = document.createElement('article')
        var dateEl = document.createElement('p')
        var weatherEl = document.createElement('img')
        var tempEl = document.createElement('p')
        var windEl = document.createElement('p')
        var humidityEL = document.createElement('p')

        date = dayjs.unix(forecast.list[i].dt)
        dateEl.textContent = date.format('DD/MM/YYYY')
        weatherEl.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}.png`)
        tempEl.textContent = `Temp: ${forecast.list[i].main.temp}`
        windEl.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`
        humidityEL.textContent = `Humidity: ${forecast.list[i].main.humidity}%`

        cardEl.append(dateEl, weatherEl, tempEl, windEl, humidityEL)

        forecastCard.appendChild(cardEl)
        forecastSection.appendChild(forecastCard)
    }    
}

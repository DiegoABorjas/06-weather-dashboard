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

function fetchWeatherForecast(lat, lon) {
    var FORECAST_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

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

function fetchCurrentWeather(lat, lon) {
    var FORECAST_API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    return fetch(FORECAST_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            return data;
        })
}

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

function renderCurrentWeather(city) {
    var today = dayjs()
    var cityDate = document.getElementById('city-date')
    var currentTemp = document.getElementById('temp')
    var currentWind = document.getElementById('wind')
    var currentHumidity = document.getElementById('humidity')
    cityDate.textContent = city.name + ` (${today.format('DD/MM/YYYY')})`
    currentTemp.textContent = `Temp: ${city.main.temp}`
    currentWind.textContent = `Wind: ${city.wind.speed} MPH`
    currentHumidity.textContent = `Humidity: ${city.main.humidity}%`
}

function renderWeatherForecast(forecast) {
    var date = dayjs()
    var forecastTitle = document.getElementById('forecast-title')
    var forecastCard = document.getElementById('forecast-cards')
    var forecastSection = document.getElementById('forecastSection')

    forecastTitle.textContent = '5-Day Forecast:'

    for (var i=0; i<6; i++) {
        var cardEl = document.createElement('article');
        var dateEl = document.createElement('p')

        dateEl.textContent = forecast.list[i].dt_txt

        cardEl.appendChild(dateEl)
        forecastCard.appendChild(cardEl)
        forecastSection.appendChild(forecastCard)
    }    
}

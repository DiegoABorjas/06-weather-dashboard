const API_KEY = 'edf5c7e48b6700fcd68b1d783895a106'

// Use Geocoding API to get coordinates from city
function fetchCoordinates(city) {
    var GEO_CODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`

    return fetch(GEO_CODING_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');
            // console.log(res)
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
            // console.log(res)
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
}

document.getElementById('searchButton').addEventListener('click', function() {
    var searchInput = document.getElementById('searchInput');

    if (!searchInput.value.trim()) return;

    fetchCoordinates(searchInput.value).then(function (coords) {
        console.log(coords);
        fetchWeatherForecast(coords[0], coords[1])
    });
})
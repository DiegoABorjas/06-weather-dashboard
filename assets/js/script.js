// Use Geocoding API to get coordinates from city
function fetchCoordinates(city) {
    var GEO_CODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=edf5c7e48b6700fcd68b1d783895a106`

    return fetch(GEO_CODING_API)
        .then(function (res) {
            if (!res.ok) throw new Error ('Error!');

            // console.log(res)

            return res.json();
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
    
    
}

fetchCoordinates('Lawrence');
let searchField = document.getElementById('location');


document.addEventListener('keypress', function(event){
    if (event.code == 'Enter'){
        setLocation();
    }
});

function setLocation(){
    getLatLon(searchField.value);
}
async function getLatLon(city){
    const locationResponse = await fetch('https://api.codetabs.com/v1/proxy?quest=http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=6e298e36e5d5dd5865e054bbe4731ec6');
    const location = await locationResponse.json();

    setLocationText(location);
    getWeather(location);
}
async function getWeather(location){
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+location[0].lat+'&lon='+location[0].lon+'&appid=6e298e36e5d5dd5865e054bbe4731ec6');
    const weather = await response.json(); 
    setBackgroundColor(weather);
    setTempValues(weather);
    console.log(weather);
}
function setBackgroundColor(weather){
    let main = document.getElementById('main');
    let icon = document.getElementById('icon');
    let apiIcon = document.getElementById('apiIcon')
    //http://openweathermap.org/img/wn/10d@2x.png
    //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    apiIcon.src = 'http://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'

    if (weather.weather[0].main == "Clouds"){
        main.style.backgroundColor = 'gray';
        icon.innerText = 'Cloudy';

    }
    if (weather.weather[0].main == "Rain"){
        main.style.backgroundColor = 'lightblue';
        icon.innerText = 'Rainy';

    }
    if (weather.weather[0].main == "Clear"){
        main.style.backgroundColor = 'lightyellow';
        icon.innerText = 'Sunny';

    }
}
function setLocationText(location){
    let locationName = document.getElementById('locationName');
    if (location[0].state == undefined){
        locationName.innerText = location[0].name + ", " + location[0].country;
    }else{
    locationName.innerText = location[0].name + ", " + location[0].state + ', '+ location[0].country;
    }
}
function setTempValues(weather){
    
    let tempValues = document.getElementById('result');
    
    tempValues.innerHTML = '<p class = "capitalize">'+weather.weather[0].description+'<p>Temperature : ' +toCelsius(weather.main.temp)+'°C</p><p>Feels Like : '+toCelsius(weather.main.feels_like)+'°C</p><p>Min Temp : '+toCelsius(weather.main.temp_min)+'°C</p><p>Max Temp : '+toCelsius(weather.main.temp_max)+'°C</p>';
}
function toCelsius(value){
    value = value - 273.5;
    return Math.round(value);
}
getLatLon('Maple Ridge');
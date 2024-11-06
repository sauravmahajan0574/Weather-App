const weatherApi = {
    key: '356a2a96918e23662c88d6424c7f8fbe',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

window.addEventListener('load', () => {
    // Accesing Geolocation of User
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        fetch(`${weatherApi.baseUrl}?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json()
        }).then(showWeatherReport)
      })}
    })

    const inputValue = document.getElementById('input');

    // adding addEventListener to keypress
    inputValue.addEventListener('keypress', (event) => {
        if(event.keyCode == 13){
        // console.log(inputValue.value);
        getWeatherReport(inputValue.value)
        }
    });

    // Adding addEventListener to Submit Button with ref. to input Value

const submit = document.getElementById('btn');

    submit.addEventListener('click', () => {
        // console.log(inputValue.value);
        getWeatherReport(inputValue.value)
    });

    // fething Data using Api Call

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${inputValue.value}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json()
    }).then(showWeatherReport)
}

// updating Date as per data derived

function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let tempreature = document.getElementById('temp');
    tempreature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let weatherType =  document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
}

// Date,Month and Days Management

function dateManage(dateArg){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['Janury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

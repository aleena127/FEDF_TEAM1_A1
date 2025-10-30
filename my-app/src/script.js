   alert("js is working!");
document.addEventListener('DOMContentLoaded', function() {


    const API_KEY = 'YOUR_API_KEY_HERE'; 

    const searchBtn = document.getElementById('search-btn');

    const locationInput = document.getElementById('location-input');

    const weatherInfo = document.getElementById('weather-info');

    

    searchBtn.addEventListener('click', getWeather);

    locationInput.addEventListener('keypress', function(e) {

        if (e.key === 'Enter') {

            getWeather();

        }

    });



    function getWeather() {

        const location = locationInput.value.trim();

        

        if (!location) {

            alert('Please enter a location');

            return;

        }



        fetch(https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric)

            .then(response => {

                if (!response.ok) {

                    throw new Error('City not found');

                }

                return response.json();

            })

            .then(data => {

                displayWeather(data);

            })

            .catch(error => {

                alert(error.message);

                console.error('Error fetching weather data:', error);

            });

    }



    function displayWeather(data) {

        const { name } = data;

        const { temp, humidity } = data.main;

        const { speed } = data.wind;

        const { description, icon } = data.weather[0];

        

        document.getElementById('location').textContent = name;

        document.getElementById('temperature').textContent = ${Math.round(temp)}°C;

        document.getElementById('description').textContent = description;

        document.getElementById('humidity').textContent = ${humidity} %;

        document.getElementById('wind').textContent = ${speed} m/s;

        

        const iconUrl = https://openweathermap.org/img/wn/${icon}@2x.png;

        document.getElementById('weather-icon').setAttribute('src', iconUrl);

        

        weatherInfo.style.display = 'block';

    }

});
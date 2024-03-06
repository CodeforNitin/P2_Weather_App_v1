const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '5f444f6e35a963e3744746bfd3bc301e';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404'){
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '500px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .desc');
            const humidity = document.querySelector('.weather-details .info-humid span');
            const wind = document.querySelector('.weather-details .info-wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Clouds':
                    image.src = 'images/clouds.png';
                    break;
                case 'Haze':
                case 'Smoke':
                    image.src = 'images/haze.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                default:
                    image.src = 'clear.png';
                    break;
            }

            temperature.innerText = `${Math.round(json.main.temp)}°C`;
            description.innerText = `${json.weather[0].description}`;
            humidity.innerText = `${json.main.humidity}%`;
            wind.innerText = `${json.wind.speed} Km/h`;
        });
});


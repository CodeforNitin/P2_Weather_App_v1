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
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove = ('active');
            weatherBox.weatherDetails.remove = ('active');
            error404.classList.add('active');
        }

        container.style.height = '555px';
        weatherBox.classList.add = ('active');
        weatherBox.weatherDetails.add = ('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .desc');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
        
            case 'Rain':
                image.src = 'images/rain.png';
                break;
        
            case 'Haze':
                image.src = 'images/haze.png';
                break;
        
            case 'Snow':
                image.src = 'images/snow.png';
                break;
        
            default:
                image.src = 'clear.png';
                break;
        }   
        
        temperature.innerText = `${json.main.temp}°C`;
        description.innerText = `${json.weather[0].description}`;
        humidity.innerText = `${json.main.humidity}%`;
        wind.innerText = `${json.wind.speed} Km/h`;
            
        });
       
        
    });








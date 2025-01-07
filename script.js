const API_KEY = '2784d9d5952382d1d582a88badbb421e'; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const weatherDesc = document.getElementById('weatherDesc');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feelsLike');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const moodMessage = document.getElementById('moodMessage');
const error = document.getElementById('error');

// Change background based on temperature
function updateBackground(temperature) {
    const body = document.body;
    if (temperature < 10) {
        body.style.background = 'linear-gradient(135deg, #83a4d4, #b6fbff)';
    } else if (temperature < 20) {
        body.style.background = 'linear-gradient(135deg, #56ab2f, #a8e063)';
    } else if (temperature < 30) {
        body.style.background = 'linear-gradient(135deg, #ff7e5f, #feb47b)';
    } else {
        body.style.background = 'linear-gradient(135deg, #ff512f, #f09819)';
    }
}

// Get mood message based on weather
function getMoodMessage(temp, condition) {
    if (condition.includes('rain')) {
        return "🌧️ Perfect day for indoor coziness!";
    } else if (condition.includes('thunder')) {
        return "⚡ Time for a movie marathon!";
    } else if (condition.includes('snow')) {
        return "❄️ Winter wonderland vibes!";
    } else if (temp < 10) {
        return "🧊 Brr! Time for hot chocolate!";
    } else if (temp < 20) {
        return "🌿 Perfect weather for a walk!";
    } else if (temp < 30) {
        return "☀️ Great day for outdoor activities!";
    }
    return "🌞 Beach day, anyone?";
}

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Update UI
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDesc.textContent = data.weather[0].description;
        temp.textContent = Math.round(data.main.temp);
        feelsLike.textContent = Math.round(data.main.feels_like);
        windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert to km/h
        humidity.textContent = data.main.humidity;
        moodMessage.textContent = getMoodMessage(Math.round(data.main.temp), data.weather[0].main.toLowerCase());
        
        // Update background
        updateBackground(Math.round(data.main.temp));
        
        // Hide error
        error.style.display = 'none';
        
    } catch (err) {
        error.style.display = 'block';
        error.textContent = err.message;
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});
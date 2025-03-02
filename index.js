
const apiKey = "5b93c20fb83d8cc180dba182fb7903d8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humi").innerHTML = data.main.humidity + "%";
            document.querySelector(".win").innerHTML = data.wind.speed + " km/h";

            switch (data.weather[0].main) {
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Storm":
                    weatherIcon.src = "images/storm.png";
                    break;
                case "Clouds":
                    weatherIcon.src = "images/cloud.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                case "Haze":
                    weatherIcon.src = "images/haze.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}
// for click on search btn 
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// for press enter key and show weather conditions

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
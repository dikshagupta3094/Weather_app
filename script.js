const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const weatherImg = document.querySelector(".weatherImg");
const tempreature = document.querySelector(".tempreature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const weather_detail = document.querySelector(".weather-detail");

async function checkWeather(city) {
  try {
    const api_key = "50a210b2b79c628f8682ea6e6bc5a4b0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`);
    const response_data = await weather_data.json();
    console.log(response_data);
    tempreature.innerHTML = `${Math.round(
      response_data.main.temp - 273.15
    )}<sup>&deg;</sup>C`;
    description.innerHTML = `${response_data.weather[0].description}`;
    humidity.innerHTML = `${response_data.main.humidity}%`;
    windSpeed.innerHTML = `${response_data.wind.speed}Km/H`;

    switch (response_data.weather[0].main) {
      case "Clouds":
        weatherImg.src = "assest/cloud.png";
        break;
      case "Rain":
        weatherImg.src = "assest/rain.png";
        break;
      case "Mist":
        weatherImg.src = "assest/mist.png";
        break;
      case "Snow":
        weatherImg.src = "assest/snow.png";
        break;
      case "Clear":
        weatherImg.src = "assest/clear.png";
        break;
    }
    weather_body.style.display = "flex";

    if (response_data.cod == "404") {
      throw error;
    }
  } catch (error) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    setTimeout(reload, 2000);
  }
  function reload() {
    location.reload();
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

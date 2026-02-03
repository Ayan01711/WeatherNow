// ===== DESKTOP SEARCH =====
const searchInput = document.getElementById("searchCity");

// Trigger search on Enter key
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getWeather(searchInput.value);
  }
});

// ===== MAIN WEATHER FUNCTION =====
function getWeather(city) {
  if (!city) return;

  const apiKey = "acf37fd7e67033fa7c096db3e4d33fb5";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        document.getElementById("locationName").innerText = "City Not Found";
        return;
      }

      // ===== UPDATE UI =====
      document.getElementById("locationName").innerText = data.name;
      document.getElementById("temperatureValue").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.getElementById("weatherType").innerText =
        data.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase());
      document.getElementById("realFeelAdditionalValue").innerText =
        Math.round(data.main.feels_like) + "°C";
      document.getElementById("humidityAdditionalValue").innerText =
        data.main.humidity + "%";
      document.getElementById("maxTemperatureAdditionalValue").innerText =
        Math.round(data.main.temp_max) + "°C";
      document.getElementById("minTemperatureAdditionalValue").innerText =
        Math.round(data.main.temp_min) + "°C";
      document.getElementById("windSpeedAdditionalValue").innerText =
        data.wind.speed + " km/h";
      document.getElementById("pressureAdditionalValue").innerText =
        data.main.pressure;
      document.getElementById("visibilityAdditionalValue").innerText =
        data.visibility / 1000 + " km";

      loadForecast(city, apiKey);
    });
}

// ===== FORECAST FUNCTION =====
function loadForecast(city, apiKey) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("forecast-container");
      container.innerHTML = "";

      const days = {};

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!days[date]) days[date] = item;
      });

      Object.values(days)
        .slice(0, 6)
        .forEach((day) => {
          container.innerHTML += `
          <div class="daily-forecast-card">
            <p>${new Date(day.dt * 1000).toDateString().slice(0, 10)}</p>
            <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">
            <p>${Math.round(day.main.temp - 273.15)}°C</p>
            <p>${day.weather[0].main}</p>
          </div>
        `;
        });
    });
}

const service = new WeatherService(CONFIG.API_KEY);
const ui = new WeatherUI();

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const toggleBtn = document.getElementById("unitToggle");

/* Search button */
searchBtn.addEventListener("click", searchWeather);

/* Enter key search */
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

/* Unit toggle */
toggleBtn.addEventListener("click", () => {
  ui.toggleUnit();
});

/* Main Weather Function */
async function searchWeather() {

  const city = searchInput.value.trim();

  if (city === "") return;

  ui.showLoading();

  try {

    const weather = await service.getCurrentWeather(city);
    const forecast = await service.getForecast(city);

    ui.displayCurrentWeather(weather);
    ui.displayForecast(forecast);

    /* Change background */
    setBackground(weather.weather[0].main);

  } catch (err) {

    console.error(err);
    ui.showError("City not found or API error");

  }

}


/* Background Image Logic */

function setBackground(condition) {

  condition = condition.toLowerCase();

  if (condition.includes("clear")) {
    document.body.style.backgroundImage =
      "url('assets/images/clear.avif')";
  }

  else if (condition.includes("cloud")) {
    document.body.style.backgroundImage =
      "url('assets/images/clouds.avif')";
  }

  else if (condition.includes("rain")) {
    document.body.style.backgroundImage =
      "url('assets/images/rain.avif')";
  }

  else if (condition.includes("snow")) {
    document.body.style.backgroundImage =
      "url('assets/images/snow.avif')";
  }

  else if (condition.includes("thunder")) {
    document.body.style.backgroundImage =
      "url('assets/images/storm.avif')";
  }

  else {
    document.body.style.backgroundImage =
      "url('assets/images/clear.avif')";
  }

}
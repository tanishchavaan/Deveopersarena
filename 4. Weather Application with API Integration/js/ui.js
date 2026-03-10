class WeatherUI {

 constructor(){

  this.currentWeatherEl = document.getElementById("currentWeather");
  this.forecastEl = document.getElementById("forecast");
  this.unitToggle = document.getElementById("unitToggle");

  this.currentUnit = "celsius";

  this.lastWeather = null;
  this.lastForecast = null;

 }

 displayCurrentWeather(data){

  this.lastWeather = data;

  const temp = this.convertTemp(data.main.temp);
  const feels = this.convertTemp(data.main.feels_like);

  const html = `
  <div class="weather-card">

  <h2>${data.name}, ${data.sys.country}</h2>

  <div class="weather-main">
  <div class="temperature">
  ${temp}°${this.currentUnit === "celsius" ? "C":"F"}
  </div>

  <div class="weather-condition">
  <i class="wi wi-owm-${data.weather[0].id}"></i>
  <span>${data.weather[0].description}</span>
  </div>
  </div>

  <div class="weather-details">

  <div class="detail">
  Feels like: ${feels}°
  </div>

  <div class="detail">
  Humidity: ${data.main.humidity}%
  </div>

  <div class="detail">
  Wind: ${data.wind.speed} m/s
  </div>

  <div class="detail">
  Pressure: ${data.main.pressure} hPa
  </div>

  </div>

  </div>
  `;

  this.currentWeatherEl.innerHTML = html;

 }

 displayForecast(data){

  this.lastForecast = data;

  const daily = this.groupForecastByDay(data.list);

  let html = `<div class="forecast-container">`;

  daily.slice(0,5).forEach(day=>{

   const date = new Date(day.dt_txt);
   const name = date.toLocaleDateString("en-US",{weekday:"short"});

   const min = this.convertTemp(day.main.temp_min);
   const max = this.convertTemp(day.main.temp_max);

   html += `

   <div class="forecast-day">

   <div class="day-name">${name}</div>

   <i class="wi wi-owm-${day.weather[0].id}"></i>

   <div class="temps">
   <span>${max}°</span>
   <span>${min}°</span>
   </div>

   <div class="condition">${day.weather[0].description}</div>

   </div>
   `;
  });

  html += `</div>`;

  this.forecastEl.innerHTML = html;

 }

 convertTemp(temp){

  if(this.currentUnit === "celsius"){
   return Math.round(temp);
  }

  return Math.round((temp*9/5)+32);

 }

 groupForecastByDay(list){

  return list.filter(item =>
   item.dt_txt.includes("12:00:00")
  );

 }

 showLoading(){

  this.currentWeatherEl.innerHTML =
  `<div class="loading">Loading weather...</div>`;

 }

 showError(msg){

  this.currentWeatherEl.innerHTML =
  `<div class="error">${msg}</div>`;

 }

 toggleUnit(){

  this.currentUnit =
  this.currentUnit === "celsius" ? "fahrenheit":"celsius";

  this.unitToggle.textContent =
  `Switch to °${this.currentUnit === "celsius"?"F":"C"}`;

  if(this.lastWeather)
   this.displayCurrentWeather(this.lastWeather);

  if(this.lastForecast)
   this.displayForecast(this.lastForecast);

 }

}
class WeatherService {

 constructor(apiKey){
  this.apiKey = apiKey;
  this.baseUrl = CONFIG.BASE_URL;
  this.cache = new Map();
  this.cacheDuration = 10 * 60 * 1000;
 }

 async getCurrentWeather(city){

  const cacheKey = `current_${city.toLowerCase()}`;
  const cached = this.getFromCache(cacheKey);
  if(cached) return cached;

  const response = await fetch(
   `${this.baseUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`
  );

  if(!response.ok){
   throw new Error("Weather fetch failed");
  }

  const data = await response.json();
  this.saveToCache(cacheKey,data);

  return data;
 }

 async getForecast(city){

  const cacheKey = `forecast_${city.toLowerCase()}`;
  const cached = this.getFromCache(cacheKey);
  if(cached) return cached;

  const response = await fetch(
   `${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`
  );

  if(!response.ok){
   throw new Error("Forecast fetch failed");
  }

  const data = await response.json();
  this.saveToCache(cacheKey,data);

  return data;
 }

 getFromCache(key){

  const cached = this.cache.get(key);

  if(cached && Date.now() - cached.timestamp < this.cacheDuration){
   return cached.data;
  }

  this.cache.delete(key);
  return null;
 }

 saveToCache(key,data){

  this.cache.set(key,{
   data:data,
   timestamp:Date.now()
  });

 }

 clearCache(){
  this.cache.clear();
 }

}
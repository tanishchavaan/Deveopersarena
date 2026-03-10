# 🌤 Weather Application

## Project Description
A responsive weather application that fetches real-time weather data using the OpenWeatherMap API.  
The application displays current weather conditions and a 5-day forecast for any searched city.

This project demonstrates frontend API integration using JavaScript, asynchronous programming, and responsive UI design.

---

## Features

- 🌡 Current weather information
- 📅 5-day weather forecast
- 🔍 City search functionality
- 🌡 Temperature unit conversion (°C / °F)
- ⭐ Favorite cities storage using localStorage
- 📱 Responsive design for mobile and desktop
- ⚠ Error handling for invalid cities or API failures
- ⏳ Loading state while fetching data
- 🖼 Dynamic background based on weather conditions

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- OpenWeatherMap API

---


---

## Setup Instructions

### 1. Get API Key
Create a free account and get an API key from  
https://openweathermap.org/api

### 2. Configure Environment
Copy the example file:

### 3. Run the Application

Open `index.html` in your browser.

You can also deploy the project using **GitHub Pages**.

---

## API Used

OpenWeatherMap API  
Provides:

- Current weather data
- 5-day forecast data

Example API endpoint:

---

## Technical Implementation

### API Integration
The application uses the JavaScript Fetch API to request weather data asynchronously.

### Architecture
The application follows a modular structure:

- **WeatherService.js** → API communication
- **UI.js** → UI rendering and DOM updates
- **app.js** → Main controller logic
- **storage.js** → localStorage management

### Data Flow

User Search  
↓  
Fetch API request  
↓  
WeatherService processes data  
↓  
UI updates DOM elements

---

## Testing

Test cases performed:

- Valid city search
- Invalid city error handling
- API failure handling
- Unit conversion toggle
- Mobile responsive layout

---

## Screenshots

(Add screenshots of your application here)

Example:

- Home screen
- Weather results
- Mobile responsive layout

---

## Future Improvements

- GPS location weather detection
- Weather alerts
- Weather map integration
- Dark/light mode toggle

---

## Author

Tanish Chavan  
B.Tech CSE


// index.js

// Weather API
const apiKey = '339a111d0a332ff974d54e352ded82ac'; // API KEY
const lat = -29.85; // Latitude for Semonkong
const lon = 27.47; // Longitude for Semonkong
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
}

function displayWeather(data) {
  const currentTemp = document.getElementById('current-temp');
  const weatherIcon = document.getElementById('weather-icon');
  const weatherDesc = document.querySelector('#weather-content figcaption');

  currentTemp.textContent = `${data.main.temp}°C`;
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  weatherDesc.textContent = data.weather[0].description;
}

function displayForecast(data) {
  const forecastContent = document.querySelector('.forecast-content');
  const forecastDays = [];
  const today = new Date().getDay();

  for (let i = 0; i < data.list.length; i += 8) { // Get one forecast per day
    const forecast = data.list[i];
    const date = new Date(forecast.dt * 1000);
    const day = date.getDay();
    if (day !== today) {
        forecastDays.push(forecast);
    }
    if (forecastDays.length === 3) {
        break;
    }
  }

  forecastContent.innerHTML = '';
  forecastDays.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    forecastContent.innerHTML += `<p>${dayName} <strong>${forecast.main.temp}°C</strong></p>`;
  });
}

fetchWeather();
fetchForecast();

// Spotlight Members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

function displaySpotlights(members) {
  const spotlights = document.getElementById('cards');
  const goldSilverMembers = members.filter(
    (member) => member.membershipLevel >= 2
  );
  if (goldSilverMembers.length === 0){return;}
  const shuffledMembers = goldSilverMembers.sort(() => 0.5 - Math.random());
  const spotlightCount = Math.min(3, shuffledMembers.length);

  for (let i = 0; i < spotlightCount; i++) {
    const member = shuffledMembers[i];
    const card = document.createElement('section');
    card.innerHTML = `
      <h2>${member.name}</h2>
      <img src="${member.image}" alt="${member.name} logo">
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <a href="${member.website}" target="_blank">Website</a>
      <p>Membership: ${member.membershipLevel}</p>
    `;
    spotlights.appendChild(card);
  }
}

loadMembers();

//hamburger Button
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show')
});

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

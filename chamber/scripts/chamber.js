// Get current page URL
const currentPage = window.location.pathname;

//All navigation links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (currentPage === '/' || currentPage.endsWith('index.html')){
        if (link.getAttribute('href').includes('index.html')){
            link.classList.add('active');
        }
    }
    else if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show')
});

// Weather
// Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// OpenWeatherMap API URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=e0b53cf5024c5a759e4c0bc8f4251f86`;

// Fetch Weather Data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // For testing
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Display Results
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`; // Current temperature
  const iconSrc = `https://openweathermap.org/img/wn/10d@2x.png`; // Weather icon URL
  const desc = data.weather[0].description; // Weather description

  // Set attributes and content
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1); // Capitalize description
}

// Call the function
apiFetch();

// Business Card
  // const url = 'data/Businesscard.json';
  const cards = document.querySelector('#cards');
  
  //Fetch data from the url
  async function getBusinesscardData() {
      const response = await fetch(url);
      const data = await response.json();
      console.table(data.businesscards); //check the data structure in the console
      displayBusinesscards(data.businesscards); // Pass only the "prophets" array to displayProphets
    }
    
    getBusinesscardData();
  
    //Take the prophets array and create a card for each prophet
    const displayProphets = (prophets) => {
      prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); // fill in the blank
        let portrait = document.createElement('img');
        let dob = document.createElement('p');
        let pob = document.createElement('p');
    
        // Full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
  
        //Date of Birth and Place of birth
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        pob.textContent = `Place of Birth: ${prophet.birthplace}`;
        
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
    
        // Append the section(card) with the created elements
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(portrait);
  
        //Append card to cards container
        cards.appendChild(card);
      }); 
    }
// fetch('data/chamber.json')
//   .then(response => response.json())
//   .then(data => {
//     const goldOrSilver = data.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
//     const spotlightContainer = document.getElementById('spotlight-container');

//     goldOrSilver.sort(() => 0.5 - Math.random()).slice(0, 3).forEach(member => {
//       spotlightContainer.innerHTML += `
//         <div class="spotlight-card">
//           <img src="${member.logo}" alt="${member.name}">
//           <h3>${member.name}</h3>
//           <p>${member.phone}</p>
//           <p>${member.address}</p>
//           <a href="${member.website}" target="_blank">Visit Website</a>
//         </div>
//       `;
//     });
//   });

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;


// Discovery JS
// Lazy Load Images
// document.addEventListener("DOMContentLoaded", () => {
//   const lazyImages = document.querySelectorAll('img.lazy');
//   const loadImages = () => {
//       lazyImages.forEach((img) => {
//           if (img.getBoundingClientRect().top < window.innerHeight) {
//               img.src = img.dataset.src;
//               img.classList.add('loaded');
//           }
//       });
//   };

//   window.addEventListener('scroll', loadImages);
//   loadImages(); // Initial check in case images are already in view
// });

// // Last Visit Message
// const lastVisitMessage = document.getElementById('lastVisitMessage');
// const lastVisit = localStorage.getItem('lastVisit');
// const currentTime = Date.now();
// localStorage.setItem('lastVisit', currentTime);

// if (!lastVisit) {
//   lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
// } else {
//   const timeDifference = currentTime - lastVisit;
//   const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
//   if (daysDifference < 1) {
//       lastVisitMessage.textContent = "Back so soon! Awesome!";
//   } else {
//       lastVisitMessage.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago.`;
//   }
// }

// Discovery
// document.addEventListener('DOMContentLoaded', () => {
//   const messageContainer = document.getElementById('lastVisitMessage');
//   const lastVisit = localStorage.getItem('lastVisit');
//   const currentTime = Date.now();

//   if (!lastVisit) {
//       messageContainer.textContent = "Welcome! Let us know if you have any questions.";
//   } else {
//       const daysSinceLastVisit = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
//       if (daysSinceLastVisit < 1) {
//           messageContainer.textContent = "Back so soon! Awesome!";
//       } else {
//           messageContainer.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
//       }
//   }

//   // Update last visit time in localStorage
//   localStorage.setItem('lastVisit', currentTime);
// });

// Calendar
document.addEventListener('DOMContentLoaded', () => {
  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  const calendarBody = document.getElementById('calendar-body');
  const selectedDateDisplay = document.getElementById('selected-date');

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Populate month dropdown
  const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  monthNames.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = month;
      if (index === currentMonth) option.selected = true;
      monthSelect.appendChild(option);
  });

  // Populate year dropdown
  const startYear = currentYear - 10;
  const endYear = currentYear + 10;
  for (let year = startYear; year <= endYear; year++) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      if (year === currentYear) option.selected = true;
      yearSelect.appendChild(option);
  }

  // Function to generate the calendar
  function generateCalendar(month, year) {
      calendarBody.innerHTML = ''; // Clear previous calendar

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let day = 1;
      for (let i = 0; i < 6; i++) { // Max 6 rows
          const row = document.createElement('tr');
          for (let j = 0; j < 7; j++) { // 7 columns
              const cell = document.createElement('td');
              if (i === 0 && j < firstDay) {
                  cell.textContent = '';
              } else if (day > daysInMonth) {
                  cell.textContent = '';
              } else {
                  cell.textContent = day;
                  cell.addEventListener('click', () => selectDate(day, month, year));
                  day++;
              }
              row.appendChild(cell);
          }
          calendarBody.appendChild(row);
          if (day > daysInMonth) break;
      }
  }
  
  // Handle date selection
  function selectDate(day, month, year) {
      document.querySelectorAll('td').forEach(cell => cell.classList.remove('selected'));
      event.target.classList.add('selected');
      const formattedDate = `${monthNames[month]} ${year}`;
      selectedDateDisplay.textContent = `You selected: ${formattedDate}`;
  }

  // Event listeners for dropdowns
  monthSelect.addEventListener('change', () => {
      currentMonth = parseInt(monthSelect.value);
      generateCalendar(currentMonth, currentYear);
  });

  yearSelect.addEventListener('change', () => {
      currentYear = parseInt(yearSelect.value);
      generateCalendar(currentMonth, currentYear);
  });

  // Generate calendar on page load
  generateCalendar(currentMonth, currentYear);
});
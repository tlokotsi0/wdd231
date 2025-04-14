const hamburger = document.getElementById('trygram');
const menuLinks = document.querySelector('#nav-animation');

hamburger.addEventListener('click', () => {
    menuLinks.classList.toggle('show');
    hamburger.classList.toggle('show');
});

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
    if(link.href.includes(activePage)) {
        link.classList.add('active');
    }
    
});

const jsonFilePath = "./data/events.json";
const eventsContainer = document.querySelector('.events-container');

 async function getEventsInfo() {
    try {
        const response = await fetch(jsonFilePath);
        
        if (response.ok) {
            let data = await response.json();
            // console.log(data);
            displayEvents(data.events);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error)
    }
 }



 function displayEvents(events) {
    events.forEach((event) => {
        
        let eventCard = document.createElement('section');
        eventCard.classList.add('events-card');

        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.name}" loading="lazy">
            <h3>${event.name}</h3>
            <button class="openDialog">Learn More</button>
            <dialog>
            <p>${event.description}</p>
            <button class="closeDialog">Close</button>
            </dialog>
        `;

        eventsContainer.appendChild(eventCard);

        let dialog = eventCard.querySelector("dialog");
        let openDialog = eventCard.querySelector(".openDialog");
        let closeDialog = eventCard.querySelector(".closeDialog")

        openDialog.addEventListener('click', (event) => {
            event.preventDefault();

            dialog.showModal();
        });

        closeDialog.addEventListener('click', (event) => {
            event.preventDefault();

            dialog.close();
        })
    });

        
 }

 getEventsInfo();

 // Intergration countries for users to select

const countryApiPath = "https://restcountries.com/v3.1/all/";
const countries = document.getElementById('countries');

async function fetchCountries() {
    try {
        const response = await fetch(countryApiPath);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCountries(data);
        } else {
            throw new Error("Error:", await response.text());
        }
    } catch (error) {
        console.error("Error:", error);
    }
} 

function displayCountries(data) {
    let countryOptions = `<option value="">Select Your Country</option>`;
    countryOptions += data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map((country) => {
            return `<option value=${country.name.common}>${country.name.common}</option>`;
        })

        .join("");
    countries.innerHTML = countryOptions;
}

fetchCountries();

 const thankYouPage = window.location.href;
//  console.log(thankYouPage);

 const pageUrl = thankYouPage.split('?')[1].split('&');
//  console.log(pageUrl);

 const formInfo = document.getElementById('form-info');


 function displayDetails(info) {
    pageUrl.forEach((el) => {
        if(el.startsWith(info)) {
            result = el.split('=')[1].replaceAll('+', ' ').replace('%40', '@');
            
        }

        
    });

    return result
 }


displayDetails('');

 
formInfo.innerHTML = `
    <h2>Child's Information</h2>
    <p>First Name: ${displayDetails('first')}</p>
    <p>Last Name: ${displayDetails('last')}</p>
    <p>Birth Date: ${displayDetails('birth')}</p>
    <p>Sport: ${displayDetails('sports')}</p>
    <p>Country: ${displayDetails('countries')}</p>
    <hr>
    <h2>Guardian Information</h2>
    <p>Full name: ${displayDetails('parent')}</p>
    <p>Phone Number: ${displayDetails('phone')}</p>
    <p>Email: ${displayDetails('email')}</p>
`

function saveSubEmail(event) {
    event.preventDefault();

    const subEmail = document.getElementById('sub-email').value;
    localStorage.setItem("SubscribedEmail",subEmail);
    window.location.href = "sub.html";

}
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

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

const url = 'data/members.json';
const memberContainer = document.querySelector("article");

// Fetch data from the JSON file
async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data); // Check the data structure in the console
    displayMembers(data); // Pass the data array directly to displayMembers
}

getMemberData();

// Display each member as a card or list item
const displayMembers = (members) => {
    members.forEach((member) => {
        // Create elements to add to the #memberContainer element
        let card = document.createElement('section');
        card.classList.add('member-card');
        // Membership level class
        if (member.membershipLevel === 1) {
            card.classList.add('member');
        } else if (member.membershipLevel === 2) {
            card.classList.add('silver');
        } else if (member.membershipLevel === 3) {
            card.classList.add('gold');
        }

        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let websiteLink = document.createElement('a');
        let image = document.createElement('img');

        // Fill in content for each element
        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        websiteLink.href = member.website;
        websiteLink.textContent = "Visit Website";
        websiteLink.target = "_blank";

        // Set up the image
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '150');
        image.setAttribute('height', '150');

        // Append elements to the card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(websiteLink);

        // Append the card to the container
        memberContainer.appendChild(card);
    });
};

// Toggle
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// Grid Button
gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

// List Button
listbutton.addEventListener("click", showList); 
function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
import {athletes} from "../data/athletes.mjs";
// console.log(athletes);



const allAthletes = document.querySelector('.all');
const fballBtn = document.querySelector('.fball-btn');
const bballBtn = document.querySelector('.bball-btn');
const vballBtn = document.querySelector('.vball-btn');

function displayAthletes(athletes) {
    document.getElementById('athletes-container').innerHTML = '';
    athletes.forEach(athlete => {
        let athleteCard = document.createElement('div');
        athleteCard.classList.add('athlete-card');

        let name = document.createElement('h3');
        let sports = document.createElement('p');
        let age = document.createElement('p');
        let country = document.createElement('p');
        let portrait = document.createElement('img');

        portrait.setAttribute('src', athlete.imgUrl);
        portrait.setAttribute('alt', `Portrait of ${athlete.name}`);
        portrait.setAttribute('loading', 'lazy');

        name.textContent = athlete.name
        sports.innerHTML = `Sports: ${athlete.sport}`;
        age.innerHTML = `Age: ${athlete.age}`;
        country.innerHTML = `Country: ${athlete.country}`;

        athleteCard.appendChild(name);
        athleteCard.appendChild(portrait);
        athleteCard.appendChild(sports);
        athleteCard.appendChild(age);
        athleteCard.appendChild(country);
        

        document.getElementById('athletes-container').appendChild(athleteCard);

    });
}

displayAthletes(athletes);



fballBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const fballers = athletes.filter(athlete => athlete.sport === 'Football');
    displayAthletes(fballers);
});

bballBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const bballers = athletes.filter(athlete => athlete.sport === 'Basketball');
    displayAthletes(bballers);
});

vballBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const vballers = athletes.filter(athlete => athlete.sport === 'Volleyball');
    displayAthletes(vballers);
});

allAthletes.addEventListener('click', (event) => {
    event.preventDefault();
    displayAthletes(athletes);
});
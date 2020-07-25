/* 
  state of application
*/

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountires();
});

async function fetchCountires() {
  // console.log('Fetching...');
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      // quando se repete podemos eliminar na desistruturação
      //population: population,
      //flag: flag,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });
  //console.log(allCountries);
  render();
}

function render() {
  //console.log('Rendering...');
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCoundleButtons();
}

function renderCountryList() {
  let countriesHTML = `<div>`;
  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;
    //console.log(country);
    const countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt"${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += `</div>`;
  tabCountries.innerHTML = countriesHTML;
}
function renderFavorites() {
  let favoritesHTML = `<div>`;
  favoriteCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;
    //console.log(country);
    const favoriteCountryHTML = `
     <div class="country">
       <div>
         <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
       </div>
       <div>
         <img src="${flag}" alt"${name}">
       </div>
       <div>
         <ul>
           <li>${name}</li>
           <li>${formattedPopulation}</li>
         </ul>
       </div>
     </div>`;
    favoritesHTML += favoriteCountryHTML;
  });
  favoritesHTML += `</div>`;
  tabFavorites.innerHTML = favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}
function handleCoundleButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  //console.log(countryButtons);
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
  //console.log(favoriteButtons);

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);
  //console.log(countryToAdd);
  //espalha o em um array
  favoriteCountries = [...favoriteCountries, countryToAdd];
  //console.log(favoriteCountries);
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}
function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(
    (country) => country.id === id
  );
  //console.log(countryToAdd);
  //espalha o em um array
  allCountries = [...allCountries, countryToRemove];
  //console.log(favoriteCountries);
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}

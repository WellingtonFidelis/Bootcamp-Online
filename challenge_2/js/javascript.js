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
  countCountries = document.querySelector('#countCountires');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountires();
});

function fetchCountires() {
  console.log('Fetching...');
}

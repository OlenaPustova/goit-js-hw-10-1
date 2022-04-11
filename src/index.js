import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputSearchref = document.querySelector('#search-box');
inputSearchref.addEventListener('input', debounce(fetchCountries, 300));

const DEBOUNCE_DELAY = 300;

const URL = 'https://restcountries.com/v2/all';

// console.log();

fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages')
  .then(response => {
    return response.json();
  })
  .then(countries => {
    console.log(countries[200].name);
  })
  .catch(error => {
    console.log(error);
  });

function fetchCountries(name) {}

function markupCountryInfo() {
  document.querySelector('.country-info').innerHTML = `<div class="country">
        <img src="https://flagcdn.com/ch.svg" width="50" alt=""/>
        <span class="country-name">Switzerland</span>
      </div>
      <p><span>Capital: </span>Bern</p>
      <p><span>Population: </span>8341600</p>
      <p><span>Language: </span>German,French,Italian</p>`;
}

markupCountryInfo();

function markupCountryList() {
  document.querySelector('.country-list').innerHTML = `<li class="country-list-item">
        <img src="https://flagcdn.com/ua.svg" width="50" alt="" class="country-list-img" />
        <span class="country-list-name">Ukraine</span>
      </li>`;
}
markupCountryList();

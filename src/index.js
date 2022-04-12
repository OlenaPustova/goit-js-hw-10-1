import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputSearchRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputSearchRef.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

function inputSearch(e) {
  const searchName = e.target.value;
  fetchCountries(searchName.trim())
    .then(countries => {
      if (countries.length === 1) {
        renderCountryInfo(countries[0]);
        countryListRef.innerHTML = '';
      } else if (countries.length > 1 && countries.length <= 10) {
        renderCountryList(countries);
        countryInfoRef.innerHTML = '';
      } else if (countries.length > 10) {
        countryListRef.innerHTML = '';
        countryInfoRef.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => error);
}

function renderCountryList(countries) {
  const markupList = markupCountryList(countries);
  countryListRef.innerHTML = markupList;
}

function renderCountryInfo(country) {
  const markupCountry = markupCountryInfo(country);
  countryInfoRef.innerHTML = markupCountry;
}

function markupCountryList(countries) {
  let arrCountries = [];
  countries
    .map(item => {
      arrCountries.push(`<li class="country-list-item">
      <img src="${item.flags.svg}" width="50" alt="" class="country-list-img" />
      <span class="country-list-name">${item.name}</span>
      </li>`);
    })
    .join('');
  return arrCountries.join('');
}

function markupCountryInfo(country) {
  let arrLanguages = [];
  country.languages.forEach(item => {
    arrLanguages.push(item.name);
  });

  return `<div class="country">
        <img src="${country.flags.svg}" width="50" alt=""/>
        <span class="country-name">${country.name}</span>
      </div>
      <p><span>Capital: </span>${country.capital}</p>
      <p><span>Population: </span>${country.population}</p>
      <p><span>Language: </span>${arrLanguages.join(', ')}</p>`;
}

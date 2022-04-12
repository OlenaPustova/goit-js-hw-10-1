import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearchRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputSearchRef.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

const URL = 'https://restcountries.com/v2/all';

const URL_FILTR = 'https://restcountries.com/v2/all?fields=name,capital,population,flags,languages';

const URL_FILTR_NAME = 'https://restcountries.com/v2/name/{name}';

console.log();

function inputSearch(e) {
  const searchName = e.target.value;
  // console.log(searchName);
  fetchCountries(searchName.trim())
    // .then(renderCountryInfo)
    .then(countries => {
      // console.log(countries);
      if (countries.length === 1) {
        renderCountryInfo(countries[0]);
        countryListRef.innerHTML = '';
      } else if (countries.length > 1 && countries.length <= 10) {
        renderCountryList(countries);
        countryInfoRef.innerHTML = '';
      } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    // if (!response.ok) return Promise.reject('404');
    return response.json();
  });
}

function renderCountryList(countries) {
  // console.log(countries);
  const markupList = markupCountryList(countries);
  countryListRef.innerHTML = markupList;
}

function renderCountryInfo(country) {
  // console.log(country);
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
  // console.log(arrCountries);
  return arrCountries.join('');
}
// markupCountryList();

function markupCountryInfo(country) {
  let lngs = country.languages;
  let languages = [];
  lngs.forEach(item => {
    languages.push(item.name);
  });

  return `<div class="country">
        <img src="${country.flags.svg}" width="50" alt=""/>
        <span class="country-name">${country.name}</span>
      </div>
      <p><span>Capital: </span>${country.capital}</p>
      <p><span>Population: </span>${country.population}</p>
      <p><span>Language: </span>${languages.join(', ')}</p>`;
}

// markupCountryInfo();

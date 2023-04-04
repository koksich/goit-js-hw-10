import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  const countryName = event.target.value.trim();

  if (countryName) {
    return fetchCountries(countryName)
      .then(data => {
        chooseMurkup(data);
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }

  countryListEl.innerHTML = '';
  countryCardEl.innerHTML = '';
}

function chooseMurkup(countries) {
  if (countries.length === 1) {
    countryListEl.innerHTML = '';
    return cardMarkup(countries);
  }
  if (countries.length >= 2 && countries.length <= 10) {
    countryCardEl.innerHTML = '';
    return listMarkup(countries);
  }
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function cardMarkup(data) {
  const murkup = data.map(country => {
    return `<h1><img src="${country.flags.svg}" alt="${
      country.name.official
    }" width="40" height="40">${country.name.official}</h1>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages)}</p>`;
  });

  countryCardEl.innerHTML = murkup;
}

function listMarkup(data) {
  const murkup = data
    .map(country => {
      return `<li> <img src="${country.flags.svg}" alt="${country.name.official}" width="60" height="40"> ${country.name.official} </li>`;
    })
    .join('');

  countryListEl.innerHTML = murkup;
}

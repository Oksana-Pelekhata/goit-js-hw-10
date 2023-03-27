import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box')
const countyListEl = document.querySelector('.country-list')
const divEl = document.querySelector('.country-info')


searchInputEl.addEventListener('input', debounce(handleSearchFormInput, DEBOUNCE_DELAY))

function handleSearchFormInput(event) {
    // event.preventDefault();

    const name = event.target.value.trim()

    resetInput()

    if (name === '') {
    return;
    }
    
    fetchCountries(name).then(
        data => {
            if (data.length === 1) {
               createMarkUpOfExtendedInfo(data)
            }

            if (data.length > 1 && data.length <= 10) {
                createMarkUpOfSeveralCountries (data)
            }

            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }

        }
    )
        .catch(
        err => {
                console.log(err);
                Notiflix.Notify.failure('Oops, there is no country with that name')
    });
      
}

function createMarkUpOfExtendedInfo(data) {
    const markUp = data.map((country) => {
return `
  <h1>
        <img src='${country.flags.svg}' alt='${country.flags.alt}' width = 35px>
        ${country.name.official}</h1>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(data[0].languages)}</p>`
    })

  divEl.insertAdjacentHTML('beforeend', markUp);
}

function createMarkUpOfSeveralCountries(data) {
   const markUp = data.map((country) => {
return `
  <li style="display:flex; align-items:center; gap:10px;">
    <img src='${country.flags.svg}' alt='${country.flags.alt}' width = 35px>
    <p>${country.name.official}</p>
</li>`
   })
    .join('');

  countyListEl.insertAdjacentHTML('beforeend', markUp); 
}

function resetInput() {
  divEl.innerHTML = '';
  countyListEl.innerHTML = '';
}
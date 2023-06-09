export { fetchCountries };


function fetchCountries(name) {
   
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`)
    .then(res => {
      if (!res.ok) {
          throw new Error(res.status);
      }

      return res.json();
    })
}

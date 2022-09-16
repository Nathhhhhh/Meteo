/* eslint-disable no-undef */
/* eslint-disable no-console */
// Météo
let lat;
let lon;
const iconMeteo = document.querySelector('#iconMeteo');
const nomVille = document.querySelector('#nomVille');
const temp = document.querySelector('#temperature');
const desc = document.querySelector('#desc');
const windValue = document.querySelector('#windValue');
const cloudValue = document.querySelector('#cloudValue');
const humidityValue = document.querySelector('#humidityValue');
let cityChoisi = $('.selectCity').find(':selected')[0];
const selectCity = document.querySelector('.selectCity');

$('.selectCity').select2();

fetch('fr.json')
  .then((response) => response.json())
  .then((cities) => {
    cities.forEach((element) => {
      const city = document.createElement('option');
      city.value = element.city;
      city.textContent = element.city;
      selectCity.appendChild(city);
    });
    $('.selectCity').on('select2:select', () => {
      console.log('test');
      cityChoisi = document.querySelector('.select2-selection__rendered').textContent;
      console.log(cityChoisi);
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityChoisi.value || cityChoisi}&appid=94cd3e5f612d877700c284f8f0ca6818`)
        .then((response) => response.json())
        .then((data) => {
          lat = data[0].lat;
          lon = data[0].lon;
          document.querySelector('.select2-selection span').addEventListener('change', () => {
            cityChoisi = $('.selectCity').find(':selected')[0].textContent;
            lat = data[0].lat;
            lon = data[0].lon;
          });

          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=94cd3e5f612d877700c284f8f0ca6818`)
            .then((response) => response.json())
            .then((weatherData) => {
              console.log(weatherData);
              nomVille.textContent = weatherData.name;
              temp.textContent = `${weatherData.main.feels_like} °C`;
              desc.textContent = weatherData.weather[0].description;
              cloudValue.textContent = weatherData.weather[0].description;
              windValue.textContent = `${weatherData.wind.speed} m/s`;
              humidityValue.textContent = `${weatherData.main.humidity} %`;
              iconMeteo.setAttribute('src', `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
              iconMeteo.setAttribute('heigth', 100);
              iconMeteo.setAttribute('width', 100);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  }).catch((err) => {
    console.log(err);
  });

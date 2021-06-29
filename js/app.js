const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = data => {
  //Destructor properties
  const { city, weather } = data;

  //update details template
  details.innerHTML = `
  <h5 class="my-3">${city.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;</span>
          </div>
  `;

  // update the night/day & icon images

  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);
  let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSource);

  time.setAttribute("src", timeSource);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async function (city) {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return {
    city: cityDetails,
    weather: weatherDetails,
  };
};

cityForm.addEventListener("submit", e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim().toLowerCase();
  cityForm.reset();

  //update the UI with the new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));

  //set localStorage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

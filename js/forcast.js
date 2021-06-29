const API_KEY = "uAHH9UIW5pQn6kGHkpxUmhZkIE3CQ8eO";

// 50 requests per day for free account

//*Get Weather Information
async function getWeather(locationKey) {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${locationKey}?apikey=${API_KEY}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

//*Get City Information
async function getCity(city) {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${API_KEY}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

getCity("wichita")
  .then(data => {
    return getWeather(data.Key);
  })
  .then(data => {})
  .catch(err => console.log(err));

const apiKey = "2cde5485d90125d36b345ff9d2a2774c";


async function getCoordinates(city){
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  let response = await fetch(url)
  let data = await response.json()
  console.log(data);
  let {lat,lon} = data[0];
  console.log(lat,lon);
  getCurrentWeather(lat, lon);
  getForcast(lat, lon)
}

async function getCurrentWeather(lat, lon){
 let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
 let response = await fetch(url)
 let data = await response.json()
 console.log("current weather", data);
 renderCurrentWeather(data)
}

async function getForcast(lat, lon){
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  let response = await fetch(url)
  let data = await response.json()
  console.log(data);
  renderForcast(data);
}

function renderCurrentWeather(city){
  document.querySelector("#city").textContent = city.name
  document.querySelector("#temp").textContent = city.main.temp
  document.querySelector("#wind").textContent = city.wind.speed
  document.querySelector("#humidity").textContent = city.main.humidity
}

function renderForcast(city){
  for (i = 0; i < city.list.length; i += 8){
    let card = document.createElement("div")
    let dateEl = document.createElement("p")
    let icon = document.createElement("img")
    let tempEl = document.createElement("p")
    let humidityEl = document.createElement("p")
    let windEl = document.createElement("p")

    dateEl.textContent = dayjs.unix(city.list[i].dt).format('MM/DD/YYYY');
    icon.src = `http://openweathermap.org/img/w/${city.list[i].weather[0].icon}.png`
    tempEl.textContent = city.list[i].main.temp
    humidityEl.textContent = city.list[i].main.humidity
    windEl.textContent = city.list[i].wind.speed
    
    card.style.padding = "15px"
    card.style.border = "1px solid grey"

    card.append(dateEl,icon,tempEl,humidityEl,windEl);
    document.querySelector("#forcast").append(card)
  }

}

// const pTag = document.createElement("p");
// pTag.setAttribute("class", "current-temp");
// pTag.textContent = data.temp
// const data = await resp.json()

// const div = document.querySelector("#weather")
// div.appendChild(pTag)




document.querySelector("#enter").addEventListener("click", function(){
  let cityName = document.querySelector("#city-name").value
  getCoordinates(cityName);
})
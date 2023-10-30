const apiKey = "2cde5485d90125d36b345ff9d2a2774c";


async function getCoordinates(city){
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  let response = await fetch(url)
  let data = await response.json()
  console.log(data);
}






document.querySelector("#enter").addEventListener("click", function(){
  let cityName = document.querySelector("#city-name").value
  getCoordinates("#city-name");
})
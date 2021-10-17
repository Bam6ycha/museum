const api = ()=>{

  const city:any = document.querySelector(".city");
  localStorage.setItem("city","Минск");
  const weatherIcon:any = document.querySelector('.weather-icon');
const temperature:any = document.querySelector('.temperature');
const weatherDescription:any = document.querySelector('.weather-description');
const humidity:any = document.querySelector(".humidity")
const wind:any = document.querySelector(".wind")
  async function createWeatherApi(){
    const userCity = city.value;
    if(!userCity) {
      const div = document.createElement("div");
      document.querySelector(".header-weather")?.append(div)
      div.style.position = "absolute";
      div.classList.add("err")
      let coordinates = city.getBoundingClientRect()
      div.style.left = coordinates.left -coordinates.width + "px"
      div.style.top = coordinates.top + "px"
      div.textContent = `${"Enter city"}`
      return
    };
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=eng&appid=6cbe690859b8bb3ff05bdf9c2ce50513&units=metric`);
    try{
    const result = await response.json();
    weatherIcon.classList.add(`owf-${result.weather[0].id}`);
    temperature.textContent = `${Math.ceil(result.main.temp)}°C`;
    weatherDescription.textContent = result.weather[0].description;
    humidity.textContent = `Humidity ${result.main.humidity}%`
    wind.textContent = `Wind ${Math.ceil( result.wind.speed)}m/s`}
    catch(err:any){
      localStorage.setItem("city","Минск")
      const div:HTMLDivElement = document.createElement("div");
      document.querySelector(".header-weather")?.append(div)
      div.style.position = "absolute";
      div.classList.add("err")
      let coordinates = city.getBoundingClientRect()
      div.style.left = coordinates.left -coordinates.width + "px"
      div.style.top = coordinates.top + "px"
      div.textContent = `${"Your input isn`t correct"}`
    }
  }
  createWeatherApi()
  city.addEventListener("focus", ()=>document.querySelector("error"));
  city.addEventListener("change",()=>{
    localStorage.setItem("city",city.value);
    createWeatherApi()
  })
  window.addEventListener("DOMContentLoaded",()=>{
    city.value = localStorage.getItem("city")
  })
}

api()
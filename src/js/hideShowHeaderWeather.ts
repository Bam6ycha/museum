
function hideShowHeaderWeaher(){
  const weatherContainer:any= document.querySelector(".header-weather")
  const weatherBurronTurnOn =document.querySelector(".settings-container__weather > button.on")
  const weatherBurronTurnOff = document.querySelector(".settings-container__weather > button.off")
  function toggleVisibility(){
    if(weatherBurronTurnOff?.classList.contains("turnOn") && weatherContainer.style.opacity!=="0"){
      weatherContainer.classList.add("invisible")
      setTimeout(()=> weatherContainer.style.visibility="hidden",500)
      weatherContainer.addEventListener("animationend",()=>{
        weatherContainer.classList.remove("invisible")
        weatherContainer.style.opacity = "0"
        localStorage.setItem("opacityHeaderWeather", `${weatherContainer.style.opacity}`)
    })
    }
    if(weatherBurronTurnOn?.classList.contains("turnOn")&&weatherContainer.style.opacity!=="1"){
      weatherContainer.style.visibility=""
      weatherContainer.classList.add("visible");
      weatherContainer.addEventListener("animationend",()=>{
        weatherContainer.classList.remove("visible")
        weatherContainer.style.opacity = "1"
        localStorage.setItem("opacityHeaderWeather", `${weatherContainer.style.opacity}`)
    })
  }
    
    
}
window.addEventListener("DOMContentLoaded",()=>{
  
  weatherContainer.style.opacity = `${localStorage.getItem("opacityHeaderWeather")}`
  toggleVisibility()
  if(localStorage.getItem("opacityHeaderWeather") === "1"){
    weatherBurronTurnOn?.classList.add("turnOn")
    weatherBurronTurnOff?.classList.add("turnOff")
  }
  if(localStorage.getItem("opacityHeaderWeather") === "0"){
    weatherBurronTurnOn?.classList.add("turnOff")
    weatherBurronTurnOff?.classList.add("turnOn")
  }
})
weatherBurronTurnOn?.addEventListener("click",toggleVisibility)
weatherBurronTurnOff?.addEventListener("click",toggleVisibility)

}

hideShowHeaderWeaher()


function hideShowDeluxe(){
const deluxePlayerOn = document.querySelector(".settings-container__deluxePlayer > button.on")
const deluxePlayerOff = document.querySelector(".settings-container__deluxePlayer > button.off")
const songName :any= document.querySelector(".header-audio-player__songName")
const progressBarContainer = document.querySelector(".progressBar")
const progressBarLinearGradient = document.querySelector(".linearGradient")
const duration = document.querySelector(".duration");
const sound = document.querySelector(".sound");
const soundBar = document.querySelector(".soundBar")

const arrFromElementsOfDeluxePlayer:Array<any> = [songName,progressBarContainer,progressBarLinearGradient,duration,sound,soundBar];
function toggleDeluxe(){
  if(deluxePlayerOff?.classList.contains("turnOn") && songName?.style.opacity !=="0"){
    arrFromElementsOfDeluxePlayer.forEach((item)=>item.classList.add("invisible"))
    setTimeout(()=> arrFromElementsOfDeluxePlayer.forEach((item)=> item.style.visibility="hidden"),500)
    arrFromElementsOfDeluxePlayer.forEach((item)=>item.addEventListener("animationend",()=>{
      arrFromElementsOfDeluxePlayer.forEach((item)=>item.classList.remove("invisible"))
      arrFromElementsOfDeluxePlayer.forEach((item)=>item.style.opacity = "0")
      arrFromElementsOfDeluxePlayer.forEach((item)=>localStorage.setItem("opacityPlayerDeluxe", `${item.style.opacity}`))
    }))
  }
  if(deluxePlayerOn?.classList.contains("turnOn")&&songName?.style.opacity !=="1"){
    arrFromElementsOfDeluxePlayer.forEach((item)=> item.style.visibility="");
    arrFromElementsOfDeluxePlayer.forEach((item)=>item.classList.add("visible"));
    arrFromElementsOfDeluxePlayer.forEach((item)=>item.addEventListener("animationend",()=>{
      arrFromElementsOfDeluxePlayer.forEach((item)=>item.classList.remove("visible"))
      arrFromElementsOfDeluxePlayer.forEach((item)=>item.style.opacity = "1")
      arrFromElementsOfDeluxePlayer.forEach((item)=>localStorage.setItem("opacityPlayerDeluxe", `${item.style.opacity}`))
    }))
  }
}
window.addEventListener("DOMContentLoaded",()=>{
  
  arrFromElementsOfDeluxePlayer.forEach((item)=>item.style.opacity = `${localStorage.getItem("opacityPlayerDeluxe")}`)
  toggleDeluxe()
  if(localStorage.getItem("opacityPlayerDeluxe") === "1"){
    deluxePlayerOn?.classList.add("turnOn")
    deluxePlayerOff?.classList.add("turnOff")
  }
  if(localStorage.getItem("opacityPlayerDeluxe") === "0"){
    deluxePlayerOn?.classList.add("turnOff")
    deluxePlayerOff?.classList.add("turnOn")
  }
})
deluxePlayerOn?.addEventListener("click",toggleDeluxe)
deluxePlayerOff?.addEventListener("click",toggleDeluxe)
}

hideShowDeluxe()
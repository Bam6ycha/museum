

const toggleButtons = ()=>{
const offButtons = document.querySelectorAll(".off")
const onButtons = document.querySelectorAll(".on")
const en = document.querySelector(".en");
const ru = document.querySelector(".ru");

function toggleOff(event?:any){
  if(event.target.classList.contains("off")){
    
    event.target.classList.remove("turnOff")
    event.target.classList.add("turnOn")
    event.target.previousElementSibling.classList.remove("turnOn");
    event.target.previousElementSibling.classList.add("turnOff")
  }
}
function toggleOn(event?:any){
  if(event.target.classList.contains("on")){
    event.target.classList.remove("turnOff")
    event.target.classList.add("turnOn")
    event.target.nextElementSibling.classList.remove("turnOn");
    event.target.nextElementSibling.classList.add("turnOff")
  }
}
function chooseLanguage(event?:any){
  if(event.target.classList.contains("en")){
    event.target.classList.remove("turnOff")
    event.target.classList.add("turnOn")
    event.target.nextElementSibling.classList.remove("turnOn");
    event.target.nextElementSibling.classList.add("turnOff")
    
  } if(event.target.classList.contains("ru")){
    event.target.classList.remove("turnOff")
    event.target.classList.add("turnOn")
    event.target.previousElementSibling.classList.remove("turnOn");
    event.target.previousElementSibling.classList.add("turnOff")
    
  }

}
window.addEventListener("DOMContentLoaded", ()=>{
  toggleOff()
  toggleOn()
  chooseLanguage()
})
en?.addEventListener("click",chooseLanguage);
ru?.addEventListener("click",chooseLanguage);
onButtons.forEach((item)=>item.addEventListener("click",toggleOn))
offButtons.forEach((item)=>item.addEventListener("click",toggleOff))

}
toggleButtons()
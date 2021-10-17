function showhideCurrentDate(){
  const currentDate:any = document.querySelector(".current-date")
  const currentDateButtonOn = document.querySelector(".settings-container__date > button.on")
  const currentDateButtonOff = document.querySelector(".settings-container__date > button.off")

  function toggleDate(){
    
    if(currentDateButtonOff?.classList.contains("turnOn") && currentDate.style.opacity!=="0"){
      currentDate.classList.add("invisible")
      setTimeout(()=> currentDate.style.visibility="hidden",500)
      currentDate.addEventListener("animationend",()=>{
        currentDate.classList.remove("invisible")
        currentDate.style.opacity = "0"
        localStorage.setItem("opacityDate", `${currentDate.style.opacity}`)
    })
    }
    if(currentDateButtonOn?.classList.contains("turnOn")&&currentDate.style.opacity!=="1"){
      currentDate.style.visibility=""
      currentDate.classList.add("visible");
      currentDate.addEventListener("animationend",()=>{
        currentDate.classList.remove("visible")
        currentDate.style.opacity = "1"
        localStorage.setItem("opacityDate", `${currentDate.style.opacity}`)
    })
  }
    
    

}
window.addEventListener("DOMContentLoaded",()=>{
  
  currentDate.style.opacity = `${localStorage.getItem("opacityDate")}`
  toggleDate()
  if(localStorage.getItem("opacityDate") === "1"){
    currentDateButtonOn?.classList.add("turnOn")
    currentDateButtonOff?.classList.add("turnOff")
  }
  if(localStorage.getItem("opacityDate") === "0"){
    currentDateButtonOn?.classList.add("turnOff")
    currentDateButtonOff?.classList.add("turnOn")
  }
})
currentDateButtonOn?.addEventListener("click",toggleDate)
currentDateButtonOff?.addEventListener("click",toggleDate)

}

showhideCurrentDate()
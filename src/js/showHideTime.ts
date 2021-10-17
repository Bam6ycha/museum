function showHideTime(){
  const showTimeButtonOn =document.querySelector(".settings-container__time > button.on")
  const showTimeButtonOff =document.querySelector(".settings-container__time > button.off")
  const timeContainer:any = document.querySelector(".current-time")
  function toggleTime(){
    
      if(showTimeButtonOff?.classList.contains("turnOn") && timeContainer.style.visibility!=="hidden"){
        timeContainer.classList.add("invisible")
        setTimeout(()=> timeContainer.style.visibility="hidden",500)
        timeContainer.addEventListener("animationend",()=>{
          timeContainer.classList.remove("invisible")
          timeContainer.style.opacity = "0"
          localStorage.setItem("opacityTime", `${timeContainer.style.opacity}`)
      })
      }
      if(showTimeButtonOn?.classList.contains("turnOn")&&timeContainer.style.opacity!=="1"){
        timeContainer.style.visibility=""
        timeContainer.classList.add("visible");
        timeContainer.addEventListener("animationend",()=>{
          timeContainer.classList.remove("visible")

          timeContainer.style.opacity = "1"
          localStorage.setItem("opacityTime", `${timeContainer.style.opacity}`)
      })
    }
      
      
  
}
  window.addEventListener("DOMContentLoaded",()=>{
    
    timeContainer.style.opacity = `${localStorage.getItem("opacityTime")}`
    toggleTime()
    if(localStorage.getItem("opacityTime") === "1"){
      showTimeButtonOn?.classList.add("turnOn")
      showTimeButtonOff?.classList.add("turnOff")
    }
    if(localStorage.getItem("opacityTime") === "0"){
      showTimeButtonOn?.classList.add("turnOff")
      showTimeButtonOff?.classList.add("turnOn")
    }
  })
  showTimeButtonOn?.addEventListener("click",toggleTime)
  showTimeButtonOff?.addEventListener("click",toggleTime)
  
}

showHideTime()
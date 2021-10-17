function showHideGreetings(){
  const greetings:any = document.querySelector(".greetings")
  const greetingsbuttonOn = document.querySelector(".settings-container__greatings > button.on")
  const greetingsbuttonOff = document.querySelector(".settings-container__greatings > button.off")
  function toggleVisibilitiGreetings(){
    if(greetingsbuttonOff?.classList.contains("turnOn") && greetings.style.visibility!=="hidden"){
      greetings.classList.add("invisible")
      setTimeout(()=> greetings.style.visibility="hidden",500)
      greetings.addEventListener("animationend",()=>{
        greetings.classList.remove("invisible")
        greetings.style.opacity = "0"
        localStorage.setItem("opacityGreetings", `${greetings.style.opacity}`)
    })
    }
    if(greetingsbuttonOn?.classList.contains("turnOn")&&greetings.style.opacity!=="1"){
      greetings.style.visibility=""
      greetings.classList.add("visible");
      greetings.addEventListener("animationend",()=>{
        greetings.classList.remove("visible")

        greetings.style.opacity = "1"
        localStorage.setItem("opacityGreetings", `${greetings.style.opacity}`)
    })
  
    
    

}
}
window.addEventListener("DOMContentLoaded",()=>{
  
  greetings.style.opacity = `${localStorage.getItem("opacityGreetings")}`
  toggleVisibilitiGreetings()
  if(localStorage.getItem("opacityGreetings") === "1"){
    greetingsbuttonOn?.classList.add("turnOn")
    greetingsbuttonOff?.classList.add("turnOff")
  }
  if(localStorage.getItem("opacityGreetings") === "0"){
    greetingsbuttonOn?.classList.add("turnOff")
    greetingsbuttonOff?.classList.add("turnOn")
  }
})
greetingsbuttonOn?.addEventListener("click",toggleVisibilitiGreetings)
greetingsbuttonOff?.addEventListener("click",toggleVisibilitiGreetings)
}
showHideGreetings()
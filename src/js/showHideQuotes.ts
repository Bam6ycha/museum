function showHideQuotes(){
const quotes:any = document.querySelector(".qutotes-day");
const quotesButtonOn=document.querySelector(".settings-container__quote > button.on")
const quotesButtonOff=document.querySelector(".settings-container__quote > button.off")
function toggleVisibilityQuotes(){
  if(quotesButtonOff?.classList.contains("turnOn") && quotes.style.visibility!=="hidden"){
    quotes.classList.add("invisible")
    setTimeout(()=> quotes.style.visibility="hidden",500)
    quotes.addEventListener("animationend",()=>{
      quotes.classList.remove("invisible")
      quotes.style.opacity = "0"
      localStorage.setItem("opacityquotes", `${quotes.style.opacity}`)
  })
  }
  if(quotesButtonOn?.classList.contains("turnOn")&&quotes.style.opacity!=="1"){
    quotes.style.visibility=""
    quotes.classList.add("visible");
    quotes.addEventListener("animationend",()=>{
      quotes.classList.remove("visible")

      quotes.style.opacity = "1"
      localStorage.setItem("opacityquotes", `${quotes.style.opacity}`)
  })

  
  

}
}
window.addEventListener("DOMContentLoaded",()=>{
  
  quotes.style.opacity = `${localStorage.getItem("opacityquotes")}`
  toggleVisibilityQuotes()
  if(localStorage.getItem("opacityquotes") === "1"){
    quotesButtonOn?.classList.add("turnOn")
    quotesButtonOff?.classList.add("turnOff")
  }
  if(localStorage.getItem("opacityquotes") === "0"){
    quotesButtonOn?.classList.add("turnOff")
    quotesButtonOff?.classList.add("turnOn")
  }
})
quotesButtonOn?.addEventListener("click",toggleVisibilityQuotes)
quotesButtonOff?.addEventListener("click",toggleVisibilityQuotes)
}
showHideQuotes()
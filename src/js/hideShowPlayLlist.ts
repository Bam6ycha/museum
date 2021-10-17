
function hideShowPlayLlist(){
  const playList = document.querySelectorAll(".header-audio-player__playList");
  const arrayFromPlayList:Array<any> = Array.from(playList)
  const playlistButtonOn =document.querySelector(".settings-container__playlist > button.on")
  const playlistButtonOff = document.querySelector(".settings-container__playlist > button.off")
  function toggleVisibility (){
    if(playlistButtonOff?.classList.contains("turnOn") && arrayFromPlayList[0].style.opacity!=="0"){
      setTimeout(()=> arrayFromPlayList.forEach((item)=> item.style.visibility="hidden"),500)
      arrayFromPlayList.forEach((item)=>item.classList.add("invisible"))
      arrayFromPlayList.forEach((item)=>item.addEventListener("animationend",()=>{
        arrayFromPlayList.forEach((item)=>item.classList.remove("invisible"))
        arrayFromPlayList.forEach((item:any)=>item.style.opacity = "0")
        arrayFromPlayList.forEach((item:any)=>localStorage.setItem("opacityPlayList", `${item.style.opacity}`))
    }))
    }
    if(playlistButtonOn?.classList.contains("turnOn")&&arrayFromPlayList[0].style.opacity!=="1"){
      arrayFromPlayList.forEach((item)=> item.style.visibility="")
      arrayFromPlayList.forEach((item)=>item.classList.add("visible"));
      arrayFromPlayList.forEach((item)=>item.addEventListener("animationend",()=>{
        arrayFromPlayList.forEach((item)=>item.classList.remove("visible"))
        arrayFromPlayList.forEach((item)=>item.style.opacity = "1")
        arrayFromPlayList.forEach((item)=>localStorage.setItem("opacityPlayList", `${item.style.opacity}`))
      }))
    }
  }
  window.addEventListener("DOMContentLoaded",()=>{
  
    arrayFromPlayList.forEach((item)=>item.style.opacity = `${localStorage.getItem("opacityPlayList")}`)
    toggleVisibility()
    if(localStorage.getItem("opacityPlayList") === "1"){
      playlistButtonOn?.classList.add("turnOn")
      playlistButtonOff?.classList.add("turnOff")
    }
    if(localStorage.getItem("opacityPlayList") === "0"){
      playlistButtonOn?.classList.add("turnOff")
      playlistButtonOff?.classList.add("turnOn")
    }
  })
  playlistButtonOn?.addEventListener("click",toggleVisibility)
  playlistButtonOff?.addEventListener("click",toggleVisibility)

}
hideShowPlayLlist()
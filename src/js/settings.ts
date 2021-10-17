const settings=()=>{
  const codeWheel:any = document.querySelector(".settings")
  const settingsContainer = document.querySelector(".settings-container-wrapper")

  function showSettingsWindow(event:any){
    if(codeWheel && event.target === codeWheel ){
      settingsContainer?.classList.toggle("toggle")
    }
  }
 function hideSettingsWindow(event:any){
   if(event.target === codeWheel) return
   settingsContainer?.classList.remove("toggle")
 }
  codeWheel.addEventListener("click",showSettingsWindow);
  document.body.addEventListener("click" ,hideSettingsWindow)
}
settings()
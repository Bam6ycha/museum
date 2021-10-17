const currentTimeOfDay = document.querySelector(".timeOfday")?.textContent;
const container = document.querySelector(".container")
const next:any = document.querySelector(".slide_next")
const prev:any = document.querySelector(".slide_prev")
let randomPictureIndex:number;

function getUrl():string{
  let indexToString:string = ""
  if(randomPictureIndex<10){
    indexToString =`0${randomPictureIndex}`
  }else{
    indexToString = `${randomPictureIndex}`
  }
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTimeOfDay}/${indexToString}.jpg`;
}


function getRandomPictureIndex():number{
  const minPictureIndex:number = 1;
  const maxPictureIndex:number = 20;
  randomPictureIndex = (Math.floor(minPictureIndex - 0.5+Math.random() * (maxPictureIndex - minPictureIndex +1)))

  return randomPictureIndex
}




async function getImg(){
 
const response = await fetch(getUrl());
const result = await response.blob()
const myImage = new Image();
myImage.src = URL.createObjectURL(result);
  


myImage.addEventListener("load",function(){ container?.append(myImage);container?.classList.remove("hide");container?.classList.add("show"); })

setTimeout(()=>container?.classList.remove("show"),3000)


myImage.classList.add("ibg");

}
document.addEventListener("DOMContentLoaded", function(){
  getRandomPictureIndex();
  getUrl();
  getImg()
})

//!--------------Create-slider-------------//
next.addEventListener("click", function(){
  container?.classList.add("hide")
  if(randomPictureIndex===20){
    randomPictureIndex=1
    if(document.querySelectorAll(".ibg>img").length>1){
    document.querySelector(".ibg > img:nth-child(0)")?.remove()}
    getImg()
   

  }else {
    randomPictureIndex++
    if(document.querySelectorAll(".ibg>img").length>1){
      document.querySelector(".ibg > img:nth-child(0)")?.remove()}
      getImg()
  
  
    }
})


prev.addEventListener("click", function(){
  container?.classList.add("hide")
  if(randomPictureIndex===1){
    randomPictureIndex=20
    if(document.querySelectorAll(".ibg>img").length>1){
      document.querySelector(".ibg > img:nth-child(0)")?.remove()}
    getImg()
  

  }else{
    randomPictureIndex--
    if(document.querySelectorAll(".ibg>img").length>1){
      document.querySelector(".ibg > img:nth-child(0)")?.remove()}
    getImg()
  
  }
})

 



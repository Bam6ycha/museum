const audio:any = document.querySelector(".audio_player");
const playButton = document.querySelector(".header-audio-player__buttonPlay")
const audioContainer :any= document.querySelector(".header-audio-player")
const previousButton = document.querySelector(".header-audio-player__buttonPrev");
const nextButton = document.querySelector(".header-audio-player__buttonNext")
const playButtonSmall=document.querySelectorAll(".header-audio-player__playSmall");
const songs = document.querySelectorAll(".header-audio-player__playList");
const linearGradient:any = document.querySelector(".linearGradient");
const sound = document.querySelector(".sound")
const progressBar:any = document.querySelector(".progressBar")
const currentMinutes:any = document.querySelector(".currentMinute")
const currentSeconds:any = document.querySelector(".currentSecond")
const totalSeconds:any = document.querySelector(".TotalSeconds")
const totalMinutes:any = document.querySelector(".TotalMinute")
const trackName:any = document.querySelector(".header-audio-player__songName")
const soundBar:any = document.querySelector(".soundBar")
let currentTrack = 0;

//!Functions
function changeSoundButtonClassOnClick(){
  if(sound?.classList.contains("mute")){
    sound.classList.remove("mute");
    sound.classList.add("sound")
    audio.muted = false;
    soundBar.value = (audio.volume*100)

  }else{
    sound?.classList.remove("sound")
    sound?.classList.add("mute");
    soundBar.value = 0
    audio.muted = true;
  }

}
function changeSoundButtonClassOnSoundChange(event:any){
  if(!audio.volume || event.code==='KeyM'){
    sound?.classList.remove("sound")
    sound?.classList.add("mute")
  }else{
    sound?.classList.remove("mute")
    sound?.classList.add("sound")
  }
}

function changeVolume(){
  audio.volume = soundBar.value/100

}

function showCurrentTime(){
  
    let curentTime = audio.currentTime;
    let currentMinute = Math.floor(curentTime / 60);
    let currentSecond = Math.floor(curentTime - 60 * currentMinute);
    currentMinute < 10
      ? (currentMinutes.innerHTML = "0" + `${currentMinute}`)
      : (currentMinutes.innerHTML = `${currentMinute}`);
    currentSecond < 10
      ? (currentSeconds.innerHTML = "0" + `${currentSecond}`)
      : (currentSeconds.innerHTML = `${currentSecond}`);
    
  
}
function showTotalDuration(){
  const totalDuration = audio.duration;
  let minutesTotalDuration = Math.floor(totalDuration / 60);
  let seconds = Math.floor(totalDuration - 60 * minutesTotalDuration);
  if (minutesTotalDuration < 10) {
    totalMinutes.innerHTML = "0" + `${minutesTotalDuration}`;
  }
  if (minutesTotalDuration >= 10) {
    totalMinutes.innerHTML = `${minutesTotalDuration}`;
  }
  if (seconds < 10) {
    totalSeconds.innerHTML = "0" + `${seconds}`;
  }
  if (seconds >= 10) {
    totalSeconds.innerHTML = `${seconds}`;
  }

}
function changeCurrentTimeWithMouse(event:any){
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;

}
function showProgress(){
 let percent = ((audio.currentTime/audio.duration)*100) 
linearGradient.style.width = `${percent}%`
}
function isPaused(){
  audio.paused? audio.play() : audio.pause()
}

function PlayOnButton(event:object|any){
if(event.target !== playButton) return
isPaused()
}
function showCurrentTrackName(){
  trackName.textContent = `${songs[currentTrack].textContent}`
}
function changeCurrentSongOnListClick(event:any){
  const arrayFromSongs = Array.from(songs);
 
  const eventTargetIndex:number = arrayFromSongs.indexOf(event.target);
  playButtonSmall[currentTrack].classList.remove("header-audio-player__pauseSmall")
    
    playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall")
  currentTrack = eventTargetIndex
  const {src,type} = playList[currentTrack]
  audio.setAttribute("src",src);
  audio.setAttribute("type",type);
  changeClassOnClick();
  isPaused()
  }

function changeClassOnClick(){
  if(audio.paused){
    playButton?.classList.remove("header-audio-player__buttonPlay")
    playButton?.classList.add("header-audio-player__buttonPause")
    playButtonSmall[currentTrack].classList.remove("header-audio-player__playSmall")
    
    playButtonSmall[currentTrack].classList.add("header-audio-player__pauseSmall")
  }else{
    playButton?.classList.remove("header-audio-player__buttonPause")
    playButton?.classList.add("header-audio-player__buttonPlay")
    playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall")
    
    playButtonSmall[currentTrack].classList.remove("header-audio-player__pauseSmall")
  }
}

const playList = [
  {
    "src" : "./assets/Aqua.mp3",
    "type" : "type='audio/mpeg'" 
  },
  {
    "src" : "./assets/Morricone.mp3",
    "type" : "type='audio/mpeg'" 
  },
  {
    "src" : "./assets/You.mp3",
    "type" : "type='audio/mpeg'" 
  },
  {
    "src" : "./assets/Wind.mp3",
    "type" : "type='audio/mpeg'" 
  }
];
function nextTrack(event:any){
  if(event?.target !== nextButton) return;
  if(currentTrack===3){
    currentTrack=0
    playButtonSmall[3].classList.remove("header-audio-player__pauseSmall")
    playButtonSmall[3].classList.add("header-audio-player__playSmall")
    playButtonSmall[0].classList.add("header-audio-player__pauseSmall")
    const {src,type} = playList[currentTrack]
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type",`${type}`)

  isPaused()
 
  return
  }
  currentTrack++;
  playButtonSmall[currentTrack-1].classList.remove("header-audio-player__pauseSmall")
    playButtonSmall[currentTrack-1].classList.add("header-audio-player__playSmall")
    playButtonSmall[currentTrack].classList.add("header-audio-player__pauseSmall")
  const {src,type} = playList[currentTrack]
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type",`${type}`)
  isPaused()
 

}
function playAfterEnd(){
  if(currentTrack === 3){
    playButtonSmall[currentTrack].classList.remove("header-audio-player__pauseSmall");
    playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall");
    currentTrack = 0
    playButtonSmall[currentTrack].classList.remove("header-audio-player__playSmall");
    playButtonSmall[currentTrack].classList.add("header-audio-player__pauseSmall");
    const {src,type} = playList[currentTrack]
  audio.setAttribute("src",src);
  audio.setAttribute("type",type);
  isPaused()
  }else{ 
  playButtonSmall[currentTrack].classList.remove("header-audio-player__pauseSmall");
  playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall");
  currentTrack++
  playButtonSmall[currentTrack].classList.remove("header-audio-player__playSmall");
  playButtonSmall[currentTrack].classList.add("header-audio-player__pauseSmall");
  const {src,type} = playList[currentTrack]
  audio.setAttribute("src",src);
  audio.setAttribute("type",type);
  isPaused()
}}
function previousTrack(event:any){
  if(event?.target !== previousButton) return;
  if(currentTrack===0){
    currentTrack=3
    playButtonSmall[0].classList.remove("header-audio-player__pauseSmall")
    playButtonSmall[0].classList.add("header-audio-player__playSmall")
    playButtonSmall[3].classList.add("header-audio-player__pauseSmall")
    const {src,type} = playList[currentTrack]
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type",`${type}`)
  isPaused()
  
  return
  }
  currentTrack--;
  playButtonSmall[currentTrack+1].classList.remove("header-audio-player__pauseSmall")
  playButtonSmall[currentTrack+1].classList.add("header-audio-player__playSmall")
  playButtonSmall[currentTrack].classList.add("header-audio-player__pauseSmall")
  const {src,type} = playList[currentTrack]
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type",`${type}`)
  isPaused()
  
 

}
window.addEventListener("DOMContentLoaded", ()=>{
  const {src,type}=playList[0]
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type",`${type}`)
})
//!===========Events
songs.forEach((item)=>item.addEventListener("click", changeCurrentSongOnListClick))
playButton?.addEventListener("click",changeClassOnClick)
audioContainer.addEventListener("click", function(event:any){
  PlayOnButton(event);
});
audio.addEventListener("play",()=>{
  showCurrentTrackName();
  showTotalDuration()
})
audio.addEventListener("timeupdate",()=>{
  showProgress();
  showCurrentTime()
  showTotalDuration()
})
previousButton?.addEventListener("click",previousTrack);
nextButton?.addEventListener("click",nextTrack)
audio.addEventListener("ended", playAfterEnd)
progressBar.addEventListener("click",changeCurrentTimeWithMouse)
progressBar.addEventListener("mousedown",()=>{
  progressBar.addEventListener("mousemove",changeCurrentTimeWithMouse);
  document.addEventListener("mouseup", ()=>progressBar.removeEventListener("mousemove",changeCurrentTimeWithMouse))
})
soundBar.addEventListener("mousedown",()=>{
  soundBar.addEventListener("mousemove", function(){
    changeVolume();
    changeSoundButtonClassOnSoundChange(event)
  });
  document.addEventListener("mouseup", ()=>soundBar.removeEventListener("mousemove",changeVolume))
})
soundBar.addEventListener("click",()=>{
  changeVolume();
  changeSoundButtonClassOnSoundChange(event)
});
document.addEventListener("DOMContentLoaded", ()=> audio.volume = 0.3)
sound?.addEventListener("click", changeSoundButtonClassOnClick);

"use strict";
//!------------MenuBurger------------//
const icon = document.querySelector(".menu__ico");
const menuBody = document.querySelector(".menu__body");
if (icon) {
  icon.addEventListener("click", function (event) {
    document.body.classList.toggle("_lock");
    icon.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

const link = document.querySelectorAll(".header-navigation__list_item");
function onMenuListClock(event) {
  if (icon.classList.contains("_active")) {
    document.body.classList.remove("_lock");
    icon.classList.remove("_active");
    menuBody.classList.remove("_active");
  }
}
link.forEach((links) => links.addEventListener("click", onMenuListClock));

//!============ByuTictets=====POPUP========//
const button = document.querySelector(".buy-tickets-content-amount__buttonBuy");
const popup = document.querySelector(".popup");
const byuNow = document.querySelector(".buy-now");
const popupBody = document.querySelector(".popup__body");
let unlock = true;
const timeout = 800;

function OnButtonClick(event) {
  if (button) {
    document.body.classList.toggle("_lock");
    popup.classList.toggle("open");
    setTimeout(() => popupBody.classList.toggle("open"), 0);
  }
}
button.addEventListener("click", OnButtonClick);

function closeBuyTictetsKeyboard(event) {
  if (popup.classList.contains("open")) {
    if (event.code === "Escape") {
      byuNow.classList.remove("open");
      popupBody.classList.remove("open");
      setTimeout(() => popup.classList.remove("open"), timeout);
      setTimeout(() => document.body.classList.remove("_lock"), timeout);
    }
  }
}
document.addEventListener("keydown", closeBuyTictetsKeyboard);

function closeBuyTictetsMouse(event) {
  if (event.target === popupBody) {
    byuNow.classList.remove("open");
    popupBody.classList.remove("open");
    setTimeout(() => popup.classList.remove("open"), timeout);
    setTimeout(() => document.body.classList.remove("_lock"), timeout);
    console.log(event.target);
  }
}
document.addEventListener("pointerdown", closeBuyTictetsMouse);
//!=============ByuTictets===inputs=======//
const minusBlack18 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(1) > button.minus_black"
);
const plusBlack18 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(1) > button.plus_black"
);
const minusBlack65 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(2) > button.minus_black"
);
const plusBlack65 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(2) > button.plus_black"
);
const input18 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(1) > input"
);
const input65 = document.querySelector(
  "div.new-ticket-buy__enteryTicket_input > div:nth-child(2) > input"
);
input18.value = 0;
input65.value = 0;
function changeValue18(event) {
  if (event.target === minusBlack18 && input18.value > 0) {
    input18.value--;
  }
  if (event.target === plusBlack18) {
    input18.value++;
  }
}
function changeValue65(event) {
  if (event.target === minusBlack65 && input65.value > 0) {
    input65.value--;
  }
  if (event.target === plusBlack65) {
    input65.value++;
  }
}

document.addEventListener("click", changeValue18);
document.addEventListener("click", changeValue65);
//!============Slider=============//
const items = document.querySelectorAll(".promo-slider__img");
const arrowNext = document.querySelector(".arrow__next");
const arrowPrew = document.querySelector(".arrow__prew");
let currentValue = document.querySelector(".current");
let checked = document.querySelectorAll(".current__checked");

let currentChecked = 0;
let currentItem = 0;
let isEnabled = true;

function chengeCurrentItem(number) {
  currentItem = (number + items.length) % items.length;
  currentChecked = (number + checked.length) % checked.length;
}

function hideItem(direction) {
  isEnabled = false;
  checked[currentChecked].classList.remove("checked");
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("visible", direction);
  });
}
function showItem(direction) {
  checked[currentChecked].classList.add("checked");
  items[currentItem].classList.add("nextVisible", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("nextVisible", direction);
    this.classList.add("visible");
    isEnabled = true;
  });
}

function previousItem(number) {
  hideItem("to__right");
  chengeCurrentItem(number - 1);
  showItem("from__left");
  currentValue.innerHTML = "0" + `${number}`;
  if (currentValue.innerHTML < "01") {
    currentValue.innerHTML = "05";
  }
}

function nextItem(number) {
  hideItem("to__left");
  chengeCurrentItem(number + 1);
  showItem("from__right");
  currentValue.innerHTML = "0" + `${number + 2}`;
  if (currentValue.innerHTML > "05") {
    currentValue.innerHTML = "01";
  }
}

arrowPrew.addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});
arrowNext.addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

//!===================Swiper================================//

let slider = document.querySelector(".promo-slider__oneline");
const swiper = (slider) => {
  let landscape = slider;
  let startValueX = 0;
  let startValueY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let pastTime = 0;
  let threshould = 100;
  let allowedTime = 400;
  landscape.addEventListener("mousedown", function (event) {
    startValueX = event.pageX;
    startValueY = event.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  });
  landscape.addEventListener("mouseup", function (event) {
    distX = event.pageX - startValueX;
    distY = event.pageY - startValueY;
    startTime = new Date().getTime();
    event.preventDefault();
    pastTime = new Date().getTime() - startTime;
    event.preventDefault();
    if (pastTime <= allowedTime) {
      if (Math.abs(distX) > threshould) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
  landscape.addEventListener("touchstart", function (event) {
    let touchObj = event.changedTouches[0];
    startValueX = touchObj.pageX;
    startValueY = touchObj.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  });
  landscape.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });
  landscape.addEventListener("touchend", function (event) {
    let touchObj = event.changedTouches[0];
    distX = touchObj.pageX - startValueX;
    distY = touchObj.pageY - startValueY;
    startTime = new Date().getTime();
    event.preventDefault();
    pastTime = new Date().getTime() - startTime;
    event.preventDefault();
    if (pastTime <= allowedTime) {
      if (Math.abs(distX) > threshould) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
};
swiper(slider);

function autoSlide() {
  let click = new Event("click");
  arrowNext.dispatchEvent(click);
}

function onMouseEnter() {
  setInterval(autoSlide, 8000);
}
document.addEventListener("DOMContentLoaded", onMouseEnter);

//!==========================slider_img===========================//
const dragButton = document.querySelector(".picture-explore__drag");
const div = document.querySelector(".picture-explore__img");
const imgBefore = document.querySelector(".picture-explore__before");

function drag(e) {
  e.preventDefault();
  dragButton.style.zIndex = 10;
  dragButton.style.position = "absolute";
  div.append(dragButton);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    if (pageX < 938) {
      pageX = 938;
    }
    if (pageX > 1660) {
      pageX = 1660;
    } else {
      dragButton.style.left = pageX - div.clientWidth - 218 + "px";
    }
  }
  function onMouseMove(event) {
    imgBefore.style.width = dragButton.style.left;
    moveAt(event.pageX);
  }
  document.addEventListener("pointermove", onMouseMove);
  document.addEventListener("pointerup", () =>
    document.removeEventListener("pointermove", onMouseMove)
  );
}
dragButton.addEventListener("pointerdown", drag);
document.addEventListener("dragstart", (event) => event.preventDefault());

//!-----------------------Art Gallery-img shuffel-------------------------------//
const imgContainerLeft = document
  .querySelector(".img-container__left")
  .querySelectorAll(".img-container__random");
const imgContainerCenter = document
  .querySelector(".img-container__center")
  .querySelectorAll(".img-container__random");
const imgContainerRigtht = document
  .querySelector(".img-container__right")
  .querySelectorAll(".img-container__random");

const arrayOfContainers = [
  ...imgContainerLeft,
  ...imgContainerCenter,
  ...imgContainerRigtht,
];

function shuffle(getHrefAndAlt) {
  getHrefAndAlt = arrayOfContainers.map((item) => item.getAttribute("src"));
  let sortedArray = getHrefAndAlt.sort(() => Math.random() - 0.5);
  for (let i = 0; i < sortedArray.length; i++) {
    arrayOfContainers[i].setAttribute("src", sortedArray[i]);
  }
}
document.addEventListener("DOMContentLoaded", shuffle);
//!=================addAmimation====ArtGallery============//

const animated = (arrayOfContainers) => {
  let newAnimated = arrayOfContainers;
  function addClass(event) {
    let scrollTop = window.pageYOffset;

    if (scrollTop > 4000) {
      imgContainerLeft[0].classList.add("animated");
      imgContainerCenter[0].classList.add("animated");
      imgContainerRigtht[0].classList.add("animated");
    }
    if (scrollTop > 4500) {
      imgContainerLeft[1].classList.add("animated");
      imgContainerCenter[1].classList.add("animated");
      imgContainerRigtht[1].classList.add("animated");
    }
    if (scrollTop > 5000) {
      imgContainerLeft[2].classList.add("animated");
      imgContainerCenter[2].classList.add("animated");
      imgContainerRigtht[2].classList.add("animated");
    }
    if (scrollTop > 5500) {
      imgContainerLeft[3].classList.add("animated");
      imgContainerCenter[3].classList.add("animated");
      imgContainerRigtht[3].classList.add("animated");
    }
  }
  window.addEventListener("scroll", addClass);
};
animated(arrayOfContainers);

//!====================sectionVideio============================//

("use strict");
//!Get elements
const player = document.querySelector(".video__player>video");
const wrapper = document.querySelector(".video-player-wrapper");

const playButtonBig = document.querySelector(".video__playBig");

const playButtonSmall = document.querySelector(".video__playSmall");

const progressBar = document.querySelector(".progressBar");
const sound = document.querySelector(".video__sound");
const soundBar = document.querySelector(".sound__value");
const fullScreenButton = document.querySelector(".player__fullscreen");
const linearGradientProgress = document.querySelector(
  ".sound__item_linearGradient_progress"
);
const linearGradientSound = document.querySelector(
  ".video__sound_linearGradient"
);
let currentSeconds = document.querySelector(".seconds");
let currentMinutes = document.querySelector(".minutes");
let minutesDuration = document.querySelector(".total_minutes_duration");
let secondsDuration = document.querySelector(".total_seconds_duration");
//! Create functions
function playVideo() {
  player.paused ? player.play() : player.pause();
}

function changeClass() {
  if (player.play) {
    playButtonBig.hidden = "";
    playButtonBig.classList.toggle("video__playBig");
    playButtonBig.classList.toggle("video__pausedBig");
    playButtonSmall.classList.toggle("video__playSmall");
    playButtonSmall.classList.toggle("video__pausedSmall");
    if (playButtonBig.classList.contains("video__pausedBig")) {
      setTimeout(() => (playButtonBig.hidden = true), 500);
    }
  }
}
function changeVisibility() {
  if (playButtonBig.classList.contains("video__playBig")) {
    playButtonBig.hidden = "";
  } else {
    playButtonBig.hidden = "";
    setTimeout(() => (playButtonBig.hidden = true), 2000);
  }
}

function playOnButtons(event) {
  if (
    event.target === player ||
    event.target === playButtonSmall ||
    event.target === playButtonBig
  ) {
    playVideo();
    changeClass();
    changeVisibility();
  }
}

function getDuration() {
  let duration = player.duration;
  let minutesTotalDuration = Math.floor(duration / 60);
  let seconds = Math.floor(duration - 60 * minutesTotalDuration);
  if (minutesTotalDuration < 10) {
    minutesDuration.innerHTML = "0" + `${minutesTotalDuration}`;
  }
  if (minutesTotalDuration >= 10) {
    minutesDuration.innerHTML = `${minutesTotalDuration}`;
  }
  if (seconds < 10) {
    secondsDuration.innerHTML = "0" + `${seconds}`;
  }
  if (seconds >= 10) {
    secondsDuration.innerHTML = `${seconds}`;
  }
}
function getCurrentTime() {
  let curentTime = player.currentTime;
  let currentMinute = Math.floor(curentTime / 60);
  let currentSecond = Math.floor(curentTime - 60 * currentMinute);
  currentMinute < 10
    ? (currentMinutes.innerHTML = "0" + `${currentMinute}`)
    : (currentMinutes.innerHTML = `${currentMinute}`);
  currentSecond < 10
    ? (currentSeconds.innerHTML = "0" + `${currentSecond}`)
    : (currentSeconds.innerHTML = `${currentSecond}`);
  progressBar.max = player.duration;
  progressBar.value = curentTime;
  let step = (curentTime / player.duration) * 100;
  linearGradientProgress.style.width = `${step}%`;
}

// function changeClassFullScreen() {
//   if (player.getAttribute("class" === "player__video")) {
//     player.setAttribute("class", "fullscreen");
//   } else {
//     player.setAttribute("class", "player__video");
//   }
// }

// function progressBarUpdate() {
//   progressBar.max = player.duration;
//   progressBar.value = `${player.currentTime}`;
//   console.log(progressBar.value);
// }
// function scrub(event) {
//   const scrubTime = (event.offsetX / progressBar.offsetWidth) * player.duration;
//   player.currentTime = scrubTime;
// }
// function changeSound() {
//   player.volume = `${soundBar.value}`;
// }
// function changeSoundButtunClass() {
//   if (sound.getAttribute("class") === "sound") {
//     sound.setAttribute("class", "muted");
//   } else {
//     sound.setAttribute("class", "sound");
//   }
// }
// function mute() {
//   if (player.volume !== 0) {
//     player.volume = "0";
//     soundBar.value = `${player.volume}`;
//   } else {
//     player.volume = "0.3";
//     soundBar.value = `${player.volume}`;
//   }
// }
// function FasterPlayBackRate() {
//   if (player.playbackRate < next.getAttribute("max"))
//     player.playbackRate += Number(next.getAttribute("step"));
// }
// function SlowerPlaybackRate() {
//   if (
//     player.playbackRate <= 5 &&
//     player.playbackRate > previus.getAttribute("min")
//   ) {
//     player.playbackRate += Number(previus.getAttribute("step"));
//   }
// }
// function showPlaybackRateNext() {
//   if (player.playbackRate >= 0 && player.playbackRate <= 5) {
//     const span = document.createElement("span");
//     span.textContent = `${player.playbackRate}`;
//     span.style.cssText = "position:fixed; color:wheat";
//     const coordinates = next.getBoundingClientRect();
//     span.style.left = coordinates.left + "px";
//     span.style.top = coordinates.top + "-10px";
//     document.body.append(span);

//     setTimeout(() => span.remove(), 500);
//   }
// }
// function setPlaybackRateSlower() {
//   if (player.playbackRate > 0 && player.playbackRate <= 5) {
//     const span = document.createElement("span");
//     span.textContent = `${player.playbackRate}`;
//     span.style.cssText = "position:fixed; color:wheat";
//     const coordinates = previus.getBoundingClientRect();
//     span.style.left = coordinates.left + "px";
//     span.style.top = coordinates.top + "-10px";
//     document.body.append(span);

//     setTimeout(() => span.remove(), 500);
//   }
// }
// function showDurationTime() {
//   let getMinutes = player.duration / 60;
//   let getSeconds = Math.round((getMinutes - Math.floor(getMinutes)) * 60);
//   secondsDuration.innerHTML = `${getSeconds}`;
//   minutesDuration.innerHTML = `${Math.floor(getMinutes)}`;
// }
// function showCurrentTime() {
//   let getMinutes = player.currentTime / 60;
//   let getSeconds = Math.round((getMinutes - Math.floor(getMinutes)) * 60);
//   if (getMinutes < 10) {
//     currentMinutes.innerHTML = `${"0" + Math.floor(getMinutes)}`;
//   } else {
//     currentMinutes.innerHTML = `${Math.floor(getMinutes)}`;
//   }
//   if (getSeconds < 10) {
//     currentSeconds.innerHTML = `${"0" + getSeconds}`;
//   } else {
//     currentSeconds.innerHTML = `${getSeconds}`;
//   }
// }
// function fullscreen() {
//   if (!document.fullscreenElement) {
//     player.requestFullscreen();
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   }
// }

// function addHotKeys(event) {
//   event.preventDefault();
//   if (event.code === "KeyM" && player.volume !== 0) {
//     player.volume = "0";
//     soundBar.value = "0";
//     sound.setAttribute("class", "muted");
//   } else if (player.volume === 0 && event.code === "KeyM") {
//     player.volume = "0.3";
//     soundBar.value = player.volume;
//     sound.setAttribute("class", "sound");
//   }

//   if (!document.fullscreenElement && event.code === "KeyF") {
//     player.requestFullscreen();
//   } else {
//     if (document.exitFullscreen && event.code === "KeyF") {
//       document.exitFullscreen();
//     }
//   }
//   if (event.key === "ArrowLeft") {
//     player.playbackRate -= 0.25;
//     const span = document.createElement("span");
//     span.textContent = `${player.playbackRate}`;
//     span.style.cssText = "position:fixed; color:wheat";
//     const coordinates = previus.getBoundingClientRect();
//     span.style.left = coordinates.left + "px";
//     span.style.top = coordinates.top + "-10px";
//     document.body.append(span);

//     setTimeout(() => span.remove(), 500);
//   }
//   if (event.key === "ArrowRight") {
//     player.playbackRate += 0.25;
//     const span = document.createElement("span");
//     span.textContent = `${player.playbackRate}`;
//     span.style.cssText = "position:fixed; color:wheat";
//     const coordinates = next.getBoundingClientRect();
//     span.style.left = coordinates.left + "px";
//     span.style.top = coordinates.top + "-10px";
//     document.body.append(span);

//     setTimeout(() => span.remove(), 500);
//   }
//   if (event.code === "KeyL") {
//     player.currentTime += 5;
//     progressBar.value = player.currentTime;
//   }
//   if (event.code === "KeyJ") {
//     player.currentTime -= 5;
//     progressBar.value = player.currentTime;
//   }
//   if (event.key === "ArrowUp") {
//     player.volume += 0.1;
//     soundBar.value = player.volume;
//   }
//   if (event.key === "ArrowDown") {
//     player.volume -= 0.1;
//     soundBar.value = player.volume;
//   }
//   if (event.code === "KeyP") {
//     player.requestPictureInPicture();
//   }
//   if (event.code === "KeyP" && document.pictureInPictureElement === player) {
//     document.exitPictureInPicture();
//   }
// }

// function stopPlayingOnSpace(event) {
//   if (event.code === "Space" && player.paused) {
//     player.play();
//     playButtunSmall.setAttribute("class", "play");
//     playButtonBig.setAttribute("class", "play_video");
//   } else if (event.code === "Space" && player.played) {
//     player.pause();
//     playButtunSmall.setAttribute("class", "pause_video_small");
//     playButtonBig.setAttribute("class", "pause_video_big");
//   }
// }
//!!Add Events
player.addEventListener("ended", () => {
  playButtonBig.classList.toggle("video__playBig");
  playButtonSmall.classList.toggle("video__playSmall");
});
player.addEventListener("loadeddata", getDuration);
player.addEventListener("mouseover", changeVisibility);
wrapper.addEventListener("click", playOnButtons);
player.addEventListener("timeupdate", getCurrentTime);
// player.addEventListener("timeupdate", progressBarUpdate);
// playButtunSmall.addEventListener("click", playVideo);
// playButtonBig.addEventListener("click", playVideo);
// playButtunSmall.addEventListener("click", smallPlayButtonChangeClass);
// progressBar.addEventListener("click", scrub);
// playButtonBig.addEventListener("click", changeClass);
// soundBar.addEventListener("click", changeSound);
// sound.addEventListener("click", mute);
// sound.addEventListener("click", changeSoundButtunClass);
// fullScreenButton.addEventListener("click", fullscreen);

// next.addEventListener("click", FasterPlayBackRate);
// next.addEventListener("click", showPlaybackRateNext);
// previus.addEventListener("click", SlowerPlaybackRate);
// previus.addEventListener("click", setPlaybackRateSlower);
// player.addEventListener("timeupdate", showDurationTime);
// player.addEventListener("timeupdate", showCurrentTime);
// document.documentElement.addEventListener("keydown", (event) =>
//   addHotKeys(event)
// );
// document.documentElement.addEventListener("keydown", (event) =>
//   stopPlayingOnSpace(event)
// );
// console.log(
//   'реализован плеер +10 реализован обязательный дополнительный функционал +10 реализованы горячие клавиши "l" вперёд на 10 с. "J" назад на 5 секунд. Картинка в картинке "p", "ArrowUp" увеличить громкость, "ArrowDown" уменьшение звука. За каждую кнопку +2 балла. Итого +10'
// );

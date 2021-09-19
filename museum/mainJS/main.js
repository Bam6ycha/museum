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
const videoPlayerWrapper = document.querySelector(".video__player");
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
const controlPannel = document.querySelector(".video__controllPanel");
let currentSeconds = document.querySelector(".seconds");
let currentMinutes = document.querySelector(".minutes");
let minutesDuration = document.querySelector(".total_minutes_duration");
let secondsDuration = document.querySelector(".total_seconds_duration");
player.volume = soundBar.value;
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

function scrub(event) {
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}
function changeSound() {
  player.volume = soundBar.value;
  linearGradientSound.style.width = `${soundBar.value * 100 - 0.15}%`;
  changeSoundButtonClass();
}

function changeSoundButtonClass(event) {
  if (player.volume === 0) {
    sound.classList.remove("video__sound");
    sound.classList.add("muted");
    linearGradientSound.style.width = `${0}%`;
  } else {
    sound.classList.add("video__sound");
    sound.classList.remove("muted");
  }
}
function fullscreen() {
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen();
    controlPannel.classList.remove("video__controllPanel");
    controlPannel.classList.add("fullscreen");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      controlPannel.classList.add("video__controllPanel");
      controlPannel.classList.remove("fullscreen");
    }
  }
}

function changeSoundButtonClassOnClick() {
  if (sound.classList.contains("video__sound")) {
    sound.classList.remove("video__sound");
    sound.classList.add("muted");
    linearGradientSound.style.width = "0px";
    soundBar.value = 0;
    player.volume = 0;
  } else {
    player.volume = 0.3;
    soundBar.value = player.volume;
    linearGradientSound.style.width = `${player.volume * 100 - 0.15}%`;
    sound.classList.add("video__sound");
    sound.classList.remove("muted");
  }
}

function addHotKeys(event) {
  if (event.code === "KeyF") {
    fullscreen();
  }
  if (event.code === "KeyM" && player.volume !== 0) {
    player.volume = 0;
    changeSoundButtonClassOnClick();
  } else if (event.code === "KeyM") {
    player.volume = 0.3;

    changeSoundButtonClassOnClick();
  }
  if (event.code === "Space") {
    playVideo(), changeClass(), changeVisibility();
  } else if (event.code === "Space" && player.played) {
  }
  if (event.code === "Comma" && ("ShiftLeft" || "ShiftRight")) {
    player.playbackRate += 0.25;
  }
  if (event.code === "Period" && ("ShiftLeft" || "ShiftRight")) {
    player.playbackRate -= 0.25;
  }
}

//!!Add Events
player.addEventListener("ended", () => {
  playButtonBig.classList.remove("video__pausedBig");
  playButtonBig.classList.add("video__playBig");
  playButtonSmall.classList.remove("video__pausedSmall");
  playButtonSmall.classList.add("video__playSmall");
});
player.addEventListener("loadeddata", getDuration);
player.addEventListener("mouseover", changeVisibility);
wrapper.addEventListener("click", playOnButtons);
player.addEventListener("timeupdate", getCurrentTime);
progressBar.addEventListener("click", scrub);
soundBar.addEventListener("click", changeSound);
fullScreenButton.addEventListener("click", fullscreen);
sound.addEventListener("click", changeSoundButtonClassOnClick);
document.addEventListener("keydown", addHotKeys);
document.addEventListener("keydown", (event) => event.preventDefault());

//!======================videoJourneuSlider=======================//
const videoJouneuSlider = () => {
  const items = document.querySelectorAll(".video-list__threeVideos");
  const arrowNext = document.querySelector(".next");
  const arrowPrew = document.querySelector(".prev");
  let checked = document.querySelectorAll(".round");

  let currentChecked = 0;
  let currentItem = 0;
  let isEnabled = true;

  function chengeCurrentItem(number) {
    currentItem = (number + items.length) % items.length;
    currentChecked = (number + checked.length) % checked.length;
  }

  function hideItem(direction) {
    isEnabled = false;
    checked[currentChecked].classList.remove("selected");
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("visible__flex");
      this.classList.remove(direction);
    });
  }
  function showItem(direction) {
    checked[currentChecked].classList.add("selected");
    items[currentItem].classList.add("nextVisible__flex", direction);
    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("nextVisible__flex");
      this.classList.remove(direction);
      this.classList.add("visible__flex");
      isEnabled = true;
    });
  }

  function previousItem(number) {
    hideItem("to__right");
    chengeCurrentItem(number - 1);
    showItem("from__left");
  }

  function nextItem(number) {
    hideItem("to__left");
    chengeCurrentItem(number + 1);
    showItem("from__right");
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
};
videoJouneuSlider();

//!===================Swiper================================//

// let slider = document.querySelector(".promo-slider__oneline");
// const swiper = (slider) => {
//   let landscape = slider;
//   let startValueX = 0;
//   let startValueY = 0;
//   let distX = 0;
//   let distY = 0;

//   let startTime = 0;
//   let pastTime = 0;
//   let threshould = 100;
//   let allowedTime = 400;
//   landscape.addEventListener("mousedown", function (event) {
//     startValueX = event.pageX;
//     startValueY = event.pageY;
//     startTime = new Date().getTime();
//     event.preventDefault();
//   });
//   landscape.addEventListener("mouseup", function (event) {
//     distX = event.pageX - startValueX;
//     distY = event.pageY - startValueY;
//     startTime = new Date().getTime();
//     event.preventDefault();
//     pastTime = new Date().getTime() - startTime;
//     event.preventDefault();
//     if (pastTime <= allowedTime) {
//       if (Math.abs(distX) > threshould) {
//         if (distX > 0) {
//           if (isEnabled) {
//             previousItem(currentItem);
//           }
//         } else {
//           if (isEnabled) {
//             nextItem(currentItem);
//           }
//         }
//       }
//     }
//   });
//   landscape.addEventListener("touchstart", function (event) {
//     let touchObj = event.changedTouches[0];
//     startValueX = touchObj.pageX;
//     startValueY = touchObj.pageY;
//     startTime = new Date().getTime();
//     event.preventDefault();
//   });
//   landscape.addEventListener("touchmove", function (event) {
//     event.preventDefault();
//   });
//   landscape.addEventListener("touchend", function (event) {
//     let touchObj = event.changedTouches[0];
//     distX = touchObj.pageX - startValueX;
//     distY = touchObj.pageY - startValueY;
//     startTime = new Date().getTime();
//     event.preventDefault();
//     pastTime = new Date().getTime() - startTime;
//     event.preventDefault();
//     if (pastTime <= allowedTime) {
//       if (Math.abs(distX) > threshould) {
//         if (distX > 0) {
//           if (isEnabled) {
//             previousItem(currentItem);
//           }
//         } else {
//           if (isEnabled) {
//             nextItem(currentItem);
//           }
//         }
//       }
//     }
//   });
// };
// swiper(slider);

// function autoSlide() {
//   let click = new Event("click");
//   arrowNext.dispatchEvent(click);
// }

// function onMouseEnter() {
//   setInterval(autoSlide, 8000);
// }
// document.addEventListener("DOMContentLoaded", onMouseEnter);

//!===================================getHrefOnClick======================
const changeVideoOnClick = () => {
  const videoListContainer = document.querySelector(".video-list__container");
  function getHref(event) {
    if (player.paused) {
      changeClass();
    }
    if (event.target.tagName !== "VIDEO") return;
    let src = event.target.getAttribute("src");
    let poster = event.target.getAttribute("poster");
    console.log(src);
    document
      .querySelector(".video__player>video")
      .setAttribute("poster", poster);
    document.querySelector(".video__player>video").setAttribute("src", src);
    playVideo();
  }
  videoListContainer.addEventListener("click", getHref);
};
changeVideoOnClick();

"use strict";
//!------------MenuBurger------------//
const icon = document.querySelector(".menu__ico");
const menuBody = document.querySelector(".menu__body");
const contentWrapper = document.querySelector(".promo-content");
if (icon) {
  icon.addEventListener("click", function (event) {
    document.body.classList.toggle("_lock");
    icon.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    contentWrapper.classList.toggle("hidden");
  });
}
const link = document.querySelectorAll(".header-navigation__list_item");
function onMenuListClick(event) {
  if (icon.classList.contains("_active")) {
    contentWrapper.classList.toggle("hidden");
    document.body.classList.remove("_lock");
    icon.classList.remove("_active");
    menuBody.classList.remove("_active");
  }
}
link.forEach((links) => links.addEventListener("click", onMenuListClick));

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

const slider = document.querySelector(".promo-slider__oneline");
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

// function autoSlide() {
//   let click = new Event("click");
//   arrowNext.dispatchEvent(click);
// }

// function onMouseEnter() {
//   setInterval(autoSlide, 8000);
// }
// document.addEventListener("DOMContentLoaded", onMouseEnter);

//!==========================slider_img===========================//
const dragButton = document.querySelector(".picture-explore__drag");
const div = document.querySelector(".picture-explore__img");
const imgBefore = document.querySelector(".picture-explore__before");
const img = document.querySelector(".picture-explore__after > img");

function drag(e) {
  dragButton.style.zIndex = 10;
  dragButton.style.position = "absolute";
  div.append(dragButton);

  let styles = parseInt(getComputedStyle(div).paddingLeft);
  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    let coordinates = img.getBoundingClientRect();
    if (pageX < coordinates.left) {
      pageX = coordinates.left;
    }
    if (pageX > coordinates.left + coordinates.width) {
      pageX = coordinates.left + coordinates.width;
    } else {
      dragButton.style.left = pageX - coordinates.left + styles + "px";
    }
  }
  function onMouseMove(event) {
    let imgBeforeWidth = `${parseInt(dragButton.style.left) - styles}px`;
    imgBefore.style.width = imgBeforeWidth;
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
    let coordinates = imgContainerLeft[0].getBoundingClientRect();
    let coordinatesSecond = imgContainerLeft[1].getBoundingClientRect();
    let coordinatesThird = imgContainerLeft[2].getBoundingClientRect();
    let coordinatesFourth = imgContainerLeft[3].getBoundingClientRect();

    if (coordinates.top < 800) {
      console.log;
      imgContainerLeft[0].classList.add("animated");
      imgContainerCenter[0].classList.add("animated");
      imgContainerRigtht[0].classList.add("animated");
    }
    if (coordinatesSecond.top < 800) {
      imgContainerLeft[1].classList.add("animated");
      imgContainerCenter[1].classList.add("animated");
      imgContainerRigtht[1].classList.add("animated");
    }
    if (coordinatesThird.top < 800) {
      imgContainerLeft[2].classList.add("animated");
      imgContainerCenter[2].classList.add("animated");
      imgContainerRigtht[2].classList.add("animated");
    }
    if (coordinatesFourth.top < 800) {
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
    fullScreenButton.classList.add("exit__fullscreen");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      controlPannel.classList.add("video__controllPanel");
      controlPannel.classList.remove("fullscreen");
      fullScreenButton.classList.remove("exit__fullscreen");
    }
  }
}

function changeSoundButtonClassOnClick() {
  let volume = player.volume;
  if (sound.classList.contains("video__sound")) {
    sound.classList.remove("video__sound");
    sound.classList.add("muted");
    linearGradientSound.style.width = "0px";
    soundBar.value = 0;
    player.muted = true;
  } else {
    player.muted = "";
    player.volume = volume;
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
    changeSoundButtonClassOnClick();
  } else if (event.code === "KeyM") {
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

//!======================videoJourneuSlider=======================//
const videoJouneuSlider = () => {
  const videoContainer = document.querySelector(".video-list__container");
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

//!=============================buy-ticket---calculator-------------//

const calculator = () => {
  const input65popUp = document.querySelector(
    ".new-ticket-buy__enteryTicket_input > div:nth-child(2) > input"
  );
  let amountBasic = document.querySelector(
    ".new-ticket-buy__overview_totalAmount18"
  );
  let amountSeniour = document.querySelector(
    ".new-ticket-buy__overview_totalAmount65"
  );
  let amountBasicCost = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__basic18_totalCost"
  );
  let amountSeniourCost = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__senior65_totalCost"
  );
  const container = document.querySelector(".buy-tickets-content-amount");
  const inputBasic18 = document.querySelector(
    ".buy-tickets-content-amount > div:nth-child(3) > input[type=number]"
  );
  const inputSeniour65 = document.querySelector(
    ".buy-tickets-content-amount > div:nth-child(5) > input[type=number]"
  );
  const input18Popup = document.querySelector(
    "div.new-ticket-buy__enteryTicket_input > div:nth-child(1) > input"
  );
  let totalCost = document.querySelector(
    ".new-ticket-buy__overview_creditCard > div.new-ticket-buy__overview_title > div"
  );
  function changeInputValue(event) {
    let totalAmount = document.querySelector(
      ".buy-tickets-content > div.buy-tickets-content-amount > div.buy-tickets-content-amount__totalAmount.buy-tickets-content__headlink_black"
    );
    const cost18 = 20;
    const cost65 = 10;
    if (event.target.classList.contains("plus18")) {
      ++inputBasic18.value;
      input18Popup.value = inputBasic18.value;
      amountBasic.innerHTML = inputBasic18.value;
      amountBasicCost.innerHTML = `${inputBasic18.value * cost18}€`;
      totalCost.innerHTML = `${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }€`;
      totalAmount.innerHTML = `Total €${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }`;
    }
    if (event.target.classList.contains("minus18") && inputBasic18.value > 0) {
      --inputBasic18.value;
      input18Popup.value = inputBasic18.value;
      amountBasic.innerHTML = inputBasic18.value;
      amountBasicCost.innerHTML = `${inputBasic18.value * cost18}€`;
      totalCost.innerHTML = `${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }€`;
      totalAmount.innerHTML = `Total €${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }`;
    }
    if (event.target.classList.contains("plus65")) {
      ++inputSeniour65.value;
      input65popUp.value = inputSeniour65.value;
      amountSeniour.innerHTML = inputSeniour65.value;
      amountSeniourCost.innerHTML = `${inputSeniour65.value * cost65}€`;
      totalCost.innerHTML = `${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }€`;
      totalCost.innerHTML = ` €${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }`;
      totalAmount.innerHTML = `Total €${
        inputSeniour65.value * cost65 + inputBasic18.value * cost18
      }`;
    }
    if (
      event.target.classList.contains("minus65") &&
      inputSeniour65.value > 0
    ) {
      --inputSeniour65.value;
      input65popUp.value = inputSeniour65.value;
      amountSeniour.innerHTML = inputSeniour65.value;
      amountSeniourCost.innerHTML = `${inputSeniour65.value * cost65}€`;
      totalCost.innerHTML = `${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }€`;
      totalCost.innerHTML = ` €${
        inputBasic18.value * cost18 + inputSeniour65.value * cost65
      }`;
      totalAmount.innerHTML = `Total €${
        inputSeniour65.value * cost65 + inputBasic18.value * cost18
      }`;
    }
  }
  let selectedTicketTypeDescription = document.querySelector(
    ".new-ticket-buy__overview_subtitle_tictetTypeImformation"
  );
  const inputTypeRadioContainer = document.querySelector(
    ".buy-tickets-content-type"
  );
  let selectedTicketType = document.querySelector(
    ".new-ticket-buy__form > div.new-ticket-buy__select > select"
  );
  const inputTypeRadio = inputTypeRadioContainer.querySelectorAll("input");
  function inputRadioChangeValue() {
    let arrOfInputs = Array.from(inputTypeRadio);
    let checked = arrOfInputs.filter((item) => item.checked === true);
    selectedTicketTypeDescription.innerHTML = checked[0].value;
    selectedTicketType.value = checked[0].value;
    selectedTicketType.style.background = "transparent";
  }
  inputTypeRadioContainer.addEventListener("change", inputRadioChangeValue);
  container.addEventListener("click", changeInputValue);
};
calculator();

//!------------------------------------------------------popUpCalculator=============================//

const popUpCalculator = () => {
  const cost18 = 20;
  const cost65 = 10;

  const input18Popup = document.querySelector(
    ".new-ticket-buy__enteryTicket_input > div:nth-child(1) > input"
  );
  const input65popUp = document.querySelector(
    ".new-ticket-buy__enteryTicket_input > div:nth-child(2) > input"
  );

  let amountBasic = document.querySelector(
    ".new-ticket-buy__overview_totalAmount18"
  );
  let amountSeniour = document.querySelector(
    ".new-ticket-buy__overview_totalAmount65"
  );
  let amountBasicCost = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__basic18_totalCost"
  );
  let totalCost = document.querySelector(
    ".new-ticket-buy__overview_creditCard > div.new-ticket-buy__overview_title > div"
  );
  let amountSeniourCost = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__senior65_totalCost"
  );
  let selectedDate = document.querySelector(
    ".new-ticket-buy__overview_subtitle_dateImformation"
  );

  let selectedTicketTypeDescription = document.querySelector(
    ".new-ticket-buy__overview_subtitle_tictetTypeImformation"
  );
  let selectedTicketType = document.querySelector(
    ".new-ticket-buy__form > div.new-ticket-buy__select > select"
  );
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
  const inputNumberContainer = document.querySelector(
    ".new-ticket-buy__enteryTicket"
  );
  function calculateTotalAmount() {
    if (event.target === plusBlack18) {
      input18Popup.value++;
      amountBasic.innerHTML = `${input18Popup.value}`;
      amountBasicCost.innerHTML = `${cost18 * input18Popup.value} €`;
      totalCost.innerHTML = `${
        cost18 * input18Popup.value + cost65 * input65popUp.value
      } €`;
    }
    if (event.target === minusBlack18 && input18Popup.value > 0) {
      input18Popup.value--;
      amountBasic.innerHTML = `${input18Popup.value}`;
      amountBasicCost.innerHTML = `${cost18 * input18Popup.value} €`;
      totalCost.innerHTML = `${
        cost18 * input18Popup.value + cost65 * input65popUp.value
      } €`;
    }
    if (event.target === plusBlack65) {
      input65popUp.value++;
      amountSeniour.innerHTML = `${input65popUp.value}`;
      amountSeniourCost.innerHTML = `${cost65 * input65popUp.value} €`;
      totalCost.innerHTML = `${
        cost18 * input18Popup.value + cost65 * input65popUp.value
      } €`;
    }
    if (event.target === minusBlack65 && input65popUp.value > 0) {
      input65popUp.value--;
      amountSeniour.innerHTML = `${input65popUp.value}`;
      amountSeniourCost.innerHTML = `${cost65 * input65popUp.value} €`;
      totalCost.innerHTML = `${
        cost18 * input18Popup.value + cost65 * input65popUp.value
      } €`;
    }
  }
  function changeBackgroundOnSelect() {
    if (selectedTicketType.selectedIndex > "0") {
      selectedTicketType.style.background = "transparent";
      selectedTicketTypeDescription.innerHTML = selectedTicketType.value;
    } else {
      selectedTicketType.style.background = "";
    }
  }
  const date = document.querySelector(".selectDate");
  function changeDate() {
    const daysOftheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthOfTheYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];
    const selectedDateMilliseconds = date.valueAsNumber;
    let day = new Date(selectedDateMilliseconds).getDay();
    let month = new Date(selectedDateMilliseconds).getMonth();
    let dayOfMonth = new Date(selectedDateMilliseconds).getDate();
    selectedDate.innerHTML = `${
      daysOftheWeek[day] + "," + " " + monthOfTheYear[month] + " " + dayOfMonth
    }`;
    date.style.background = "transparent";
  }
  let selectedTime = document.querySelector(".new-ticket-buy__time > select");
  const selectedTimeString = document.querySelector(
    ".new-ticket-buy__overview_subtitle_dateTimeImformation"
  );
  function changeTime() {
    selectedTimeString.innerHTML = selectedTime.value;
    selectedTime.style.background = "transparent";
    if (selectedTime.selectedIndex === 0) {
      selectedTime.style.background = "";
    }
  }
  const inputEmail = document.querySelector(".new-ticket-buy__eMail_Input");

  function validateEmail() {
    if (inputEmail.value === "") {
      return;
    }
    if (!inputEmail.value.includes("@")) {
      let div = document.createElement("div");
      inputEmail.after(div);
      div.style.position = "absolute";

      let coordinates = inputEmail.getBoundingClientRect();

      div.style.left = coordinates.left + coordinates.width / 2 + "px";
      div.style.top =
        coordinates.top + coordinates.height + div.clientHeight + "px";
      div.style.cssText =
        "border : 1px solid red; color:red; text-align:center";
      div.innerHTML = "E-mail must contains '@'";
    }
  }
  inputEmail.addEventListener("blur", validateEmail);
  inputEmail.addEventListener("focus", () => {
    document
      .querySelector(".new-ticket-buy__eMail > div:nth-child(2)")
      .remove();
  });
  selectedTime.addEventListener("change", changeTime);
  date.addEventListener("change", changeDate);
  selectedTicketType.addEventListener("change", changeBackgroundOnSelect);
  inputNumberContainer.addEventListener("click", calculateTotalAmount);
  const phoneNumberInput = document.querySelector(
    ".new-ticket-buy__number_input"
  );
  function validatePhoneNumber() {
    let value = phoneNumberInput.value;
    if (value === "") {
      return;
    }
    if (!parseInt(value)) {
      let div = document.createElement("div");
      phoneNumberInput.after(div);
      div.style.position = "absolute";

      let coordinates = phoneNumberInput.getBoundingClientRect();

      div.style.left = coordinates.left + coordinates.width / 2 + "px";
      div.style.top =
        coordinates.top + coordinates.height + div.clientHeight + "px";
      div.style.cssText =
        "border : 1px solid red; color:red; text-align:center";
      div.innerHTML = "Phone number must contains numbers (1-9);";
    }
  }
  phoneNumberInput.addEventListener("blur", validatePhoneNumber);
  phoneNumberInput.addEventListener("focus", () => {
    document
      .querySelector(".new-ticket-buy__number > div:nth-child(2)")
      .remove();
  });
};

popUpCalculator();

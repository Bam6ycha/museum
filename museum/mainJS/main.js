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
const burgerBody = document.querySelector(".header-navigation__list");

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
    // document.body.classList.toggle("_lock");
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
      // setTimeout(() => document.body.classList.remove("_lock"), timeout);
    }
  }
}
document.addEventListener("keydown", closeBuyTictetsKeyboard);
const cross = document.querySelector(".cross_body");
function closeBuyTictetsMouse(event) {
  if (event.target === popupBody || event.target === cross) {
    byuNow.classList.remove("open");
    popupBody.classList.remove("open");
    setTimeout(() => popup.classList.remove("open"), timeout);
    // setTimeout(() => document.body.classList.remove("_lock"), timeout);
    console.log(event.target);
  }
}
document.addEventListener("pointerdown", closeBuyTictetsMouse);

//!============Slider=============//
const items = document.querySelectorAll(".promo-slider__img");
const arrowNext = document.querySelector(".arrow__next");
const arrowPrew = document.querySelector(".arrow__prew");
const promoWrapper = document.querySelector(".promo_wrapper");
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

checked.forEach((item) =>
  item.addEventListener("click", function (event) {
    const arrayChecked = Array.from(checked);
    const indexofEvent = arrayChecked.indexOf(event.target);
    if (currentItem >= indexofEvent) {
      for (let i = 0; i < currentItem - indexofEvent; i++) {
        if (isEnabled) {
          previousItem(indexofEvent + 1);
        }
      }
    }
    if (currentItem <= indexofEvent) {
      for (let i = 0; i < indexofEvent - currentItem; i++) {
        if (isEnabled) {
          nextItem(indexofEvent - 1);
        }
      }
    }
  })
);
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
    let coordinates = imgContainerLeft[0].getBoundingClientRect();
    let coordinatesSecond = imgContainerLeft[1].getBoundingClientRect();
    let coordinatesThird = imgContainerLeft[2].getBoundingClientRect();
    let coordinatesFourth = imgContainerLeft[3].getBoundingClientRect();
    let coordinatesfive = imgContainerLeft[4].getBoundingClientRect();

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
    if (window.pageYOffset < 3333) {
      imgContainerRigtht.forEach((item) => item.classList.remove("animated"));
      imgContainerLeft.forEach((item) => item.classList.remove("animated"));
      imgContainerCenter.forEach((item) => item.classList.remove("animated"));
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
// //! Create functions
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
  // currentMinute < 10
  //   ? (currentMinutes.innerHTML = "0" + `${currentMinute}`)
  //   : (currentMinutes.innerHTML = `${currentMinute}`);
  // currentSecond < 10
  //   ? (currentSeconds.innerHTML = "0" + `${currentSecond}`)
  //   : (currentSeconds.innerHTML = `${currentSecond}`);
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
  if (
    event.code === "KeyF" &&
    window.pageYOffset > 2340 &&
    window.pageYOffset < 4500
  ) {
    fullscreen();
  }
  if (event.code === "KeyM" && player.volume !== 0) {
    changeSoundButtonClassOnClick();
  } else if (event.code === "KeyM") {
    changeSoundButtonClassOnClick();
  }
  if (
    event.code === "Space" &&
    window.pageYOffset > 2340 &&
    window.pageYOffset < 4500
  ) {
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

// //!!Add Events
player.addEventListener("ended", () => {
  playButtonBig.classList.remove("video__pausedBig");
  playButtonBig.classList.add("video__playBig");
  playButtonBig.hidden = "";
  playButtonSmall.classList.remove("video__pausedSmall");
  playButtonSmall.classList.add("video__playSmall");
});
soundBar.addEventListener("mousemove", changeSound);
player.addEventListener("loadeddata", getDuration);

player.addEventListener("mouseover", changeVisibility);
wrapper.addEventListener("click", playOnButtons);
player.addEventListener("timeupdate", getCurrentTime);
progressBar.addEventListener("mousedown", (event) => {
  scrub(event);
  function returnScrub(event) {
    return scrub(event);
  }
  progressBar.addEventListener("mousemove", returnScrub);
  progressBar.addEventListener("mouseup", () =>
    progressBar.removeEventListener("mousemove", returnScrub)
  );
});
soundBar.addEventListener("click", changeSound);
fullScreenButton.addEventListener("click", fullscreen);
sound.addEventListener("click", changeSoundButtonClassOnClick);
document.addEventListener("keydown", addHotKeys);

//!======================videoJourneuSlider=======================//

const videoJouneuSlider = () => {
  $(document).ready(function () {
    $(".video-list__container").slick({
      arrows: true,
      dots: true,
      slidesToShow: 3,
      speed: 700,
      easing: "ease-in-out",
    });

    const container = document.querySelector(".video-list");
    const video = document.querySelector(".video__player>video");
    let src = document
      .querySelector(".video__player>video")
      .getAttribute("src");
    let poster = document
      .querySelector(".video__player>video")
      .getAttribute("poster");
    const linearGradientProgress = document.querySelector(
      ".sound__item_linearGradient_progress"
    );
    const playButtonBig = document.querySelector(".video__playBig");
    const sliderItem = document.querySelector(".slider__item ");
    const bulletst = document.querySelectorAll(".slick-dots> li>button");
    const arrowPrev = document.querySelector(".slick-prev");
    const arrowNext = document.querySelector(".slick-next");

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
    const arrayOfCrs = [
      "./assets/video/01.mp4",
      "./assets/video/02.mp4",
      "./assets/video/03.mp4",
      "./assets/video/04.mp4",
      "./assets/video/05.mp4",
    ];
    const posters = [
      "./assets/video/01.jpg",
      "./assets/video/02.jpg",
      "./assets/video/03.jpg",
      "./assets/video/04.jpg",
      "./assets/video/05.jpg",
    ];
    function getSrcOnBullets(event) {
      if (!event.target.hasAttribute("type")) return;
      isEnabled = false;
      setTimeout(() => (isEnabled = true), 700);
      linearGradientProgress.style.width = 0;
      video.curentTime = 0;
      const arrayFromBullets = Array.from(bulletst);
      video.setAttribute(
        "src",
        `${arrayOfCrs[arrayFromBullets.indexOf(event.target)]}`
      );
      video.setAttribute(
        "poster",
        `${posters[arrayFromBullets.indexOf(event.target)]}`
      );
      if (playButtonBig.classList.contains("video__pausedBig")) {
        changeClass();
        return;
      } else {
        return;
      }
    }
    function getSrcOnArrowPrev(event) {
      if (event.target !== arrowPrev) return;
      isEnabled = false;
      setTimeout(() => (isEnabled = true), 700);

      if (arrayOfCrs.indexOf(src) === 0) {
        src = arrayOfCrs[4];
        poster = posters[4];
        video.setAttribute("src", `${arrayOfCrs[4]}`);
        video.setAttribute("poster", `${posters[4]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        } else {
          return;
        }
      }
      if (arrayOfCrs.indexOf(src) === 4) {
        src = arrayOfCrs[3];
        poster = posters[3];
        video.setAttribute("src", `${arrayOfCrs[3]}`);
        video.setAttribute("poster", `${posters[3]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
        } else {
          return;
        }
      }
      if (arrayOfCrs.indexOf(src) === 3) {
        src = arrayOfCrs[2];
        poster = posters[2];
        video.setAttribute("src", `${arrayOfCrs[2]}`);
        video.setAttribute("poster", `${posters[2]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 2) {
        src = arrayOfCrs[1];
        poster = posters[1];
        video.setAttribute("src", `${arrayOfCrs[1]}`);
        video.setAttribute("poster", `${posters[1]}`);

        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 1) {
        src = arrayOfCrs[0];
        poster = posters[0];
        video.setAttribute("src", `${arrayOfCrs[0]}`);
        video.setAttribute("poster", `${posters[0]}`);

        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
    }
    let isEnabled = true;
    function getSrcOnArrowNext(event) {
      if (event.target !== arrowNext) return;
      isEnabled = false;
      setTimeout(() => (isEnabled = true), 700);

      if (arrayOfCrs.indexOf(src) === 0) {
        src = arrayOfCrs[1];
        poster = posters[1];
        video.setAttribute("src", `${arrayOfCrs[1]}`);
        video.setAttribute("poster", `${posters[1]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 1) {
        src = arrayOfCrs[2];
        poster = posters[2];
        video.setAttribute("src", `${arrayOfCrs[2]}`);
        video.setAttribute("poster", `${posters[2]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 2) {
        src = arrayOfCrs[3];
        poster = posters[3];
        video.setAttribute("src", `${arrayOfCrs[3]}`);
        video.setAttribute("poster", `${posters[3]}`);
        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 3) {
        src = arrayOfCrs[4];
        poster = posters[4];
        video.setAttribute("src", `${arrayOfCrs[4]}`);
        video.setAttribute("poster", `${posters[4]}`);

        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
      if (arrayOfCrs.indexOf(src) === 4) {
        src = arrayOfCrs[0];
        poster = posters[0];
        video.setAttribute("src", `${arrayOfCrs[0]}`);
        video.setAttribute("poster", `${posters[0]}`);

        linearGradientProgress.style.width = 0;
        video.curentTime = 0;
        if (playButtonBig.classList.contains("video__pausedBig")) {
          changeClass();
          return;
        }
        return;
      }
    }
    container.addEventListener("click", function (event) {
      if (isEnabled) {
        getSrcOnArrowNext(event);
      }
    });
    container.addEventListener("click", function (event) {
      if (isEnabled) {
        getSrcOnArrowPrev(event);
      }
    });
    container.addEventListener("click", function (event) {
      if (isEnabled) {
        getSrcOnBullets(event);
      }
    });
  });
};
videoJouneuSlider();

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
  const totalAmountTictetsType18 = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__basic18"
  );
  const totalAmountTictetsType65 = document.querySelector(
    ".new-ticket-buy__overview_totalAmoun__senior65"
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
  function changeInputValue(target = document.querySelector(".plus18")) {
    let totalAmount = document.querySelector(
      ".buy-tickets-content > div.buy-tickets-content-amount > div.buy-tickets-content-amount__totalAmount.buy-tickets-content__headlink_black"
    );
    let cost18;
    let cost65;
    const inputsRadio = document.querySelectorAll("input[type=radio]");
    if (inputsRadio[0].checked === true) {
      cost18 = 20;
      cost65 = 10;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (inputsRadio[1].checked === true) {
      cost18 = 25;
      cost65 = 12.5;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (inputsRadio[2].checked === true) {
      cost18 = 40;
      cost65 = 20;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (
      (event.target.classList.contains("plus18") && inputBasic18.value < 20) ||
      event.target === document.getElementById("1")
    ) {
      if (event.target === document.getElementById("1")) {
        inputBasic18.value;
      } else {
        ++inputBasic18.value;
      }
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
    if (
      (event.target.classList.contains("plus65") &&
        inputSeniour65.value < 20) ||
      event.target === document.getElementById("1") ||
      event.target === document.getElementById("2") ||
      event.target === document.getElementById("3")
    ) {
      if (
        event.target === document.getElementById("1") ||
        event.target === document.getElementById("2") ||
        event.target === document.getElementById("3")
      ) {
        inputSeniour65.value;
      } else {
        ++inputSeniour65.value;
      }

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
  const inputTypeRadio = inputTypeRadioContainer.querySelectorAll("input");
  let selectedTicketType = document.querySelector(
    ".new-ticket-buy__form > div.new-ticket-buy__select > select"
  );
  function inputRadioChangeValue() {
    let arrOfInputs = Array.from(inputTypeRadio);
    let checked = arrOfInputs.filter((item) => item.checked === true);
    selectedTicketTypeDescription.innerHTML = checked[0].value;
    selectedTicketType.value = checked[0].value;
    selectedTicketType.style.background = "transparent";
  }

  inputTypeRadioContainer.addEventListener("change", () => {
    inputRadioChangeValue;
  });
  inputTypeRadio.forEach((item) =>
    item.addEventListener(
      "click",
      (target = document.querySelector(".plus18")) => {
        inputRadioChangeValue();
        changeInputValue((target = document.querySelector(".plus18")));
      }
    )
  );

  container.addEventListener("click", changeInputValue);
};
calculator();

// //!------------------------------------------------------popUpCalculator=============================//

const popUpCalculator = () => {
  const selectedTicketType = document.querySelector(
    ".new-ticket-buy__form > div.new-ticket-buy__select > select"
  );

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
    const totalAmountTictetsType18 = document.querySelector(
      ".new-ticket-buy__overview_totalAmoun__basic18"
    );
    const totalAmountTictetsType65 = document.querySelector(
      ".new-ticket-buy__overview_totalAmoun__senior65"
    );
    let cost18;
    let cost65;
    if (selectedTicketType.selectedIndex === 0) {
      cost18 = 0;
      cost65 = 0;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (selectedTicketType.selectedIndex === 1) {
      cost18 = 20;
      cost65 = 10;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (selectedTicketType.selectedIndex === 2) {
      cost18 = 25;
      cost65 = 12.5;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (selectedTicketType.selectedIndex === 3) {
      cost18 = 40;
      cost65 = 20;
      totalAmountTictetsType18.innerHTML = `Basic (${cost18})€`;
      totalAmountTictetsType65.innerHTML = `Senior (${cost65})€`;
    }
    if (event.target === plusBlack18 && input18Popup.value < 20) {
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
    if (event.target === plusBlack65 && input65popUp.value < 20) {
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
  function showError(errorText, elem) {
    let div = document.createElement("div");
    elem.after(div);
    div.style.position = "absolute";

    let coordinates = elem.getBoundingClientRect();

    div.style.left = coordinates.left + coordinates.width / 2 + "px";
    div.style.top =
      coordinates.top + coordinates.height + div.clientHeight + "px";
    div.style.cssText = "border : 1px solid red; color:red; text-align:center";
    div.innerHTML = errorText;
  }
  function validateEmail() {
    if (inputEmail.value === "") {
      this.style.cssText = "border-color:''";
      return;
    }
    if (!inputEmail.value.includes("@")) {
      showError("Email must contains @", inputEmail);
      this.style.cssText = "border-color:red";
      return;
    }
    if (
      inputEmail.value.indexOf("@") < 3 ||
      inputEmail.value.indexOf("@") > 15
    ) {
      showError("Username must contains from 3 to 15 letters", inputEmail);
      this.style.cssText = "border-color:red";
      return;
    }
    if (
      inputEmail.value.slice(0, inputEmail.value.indexOf("@")).includes(" ")
    ) {
      showError("Username can't contains white spaces", inputEmail);
      this.style.cssText = "border-color:red";
      return;
    }
    if (
      inputEmail.value.slice(
        inputEmail.value.indexOf("@"),
        inputEmail.value.indexOf(".")
      ).length <= 4 ||
      inputEmail.value
        .slice(inputEmail.value.indexOf("@") + 1, inputEmail.value.indexOf("."))
        .match(/[^A-Z]/gi).length > 0
    ) {
      showError(
        "domain must contains from 4 letters of Lathin alphabit",
        inputEmail
      );
      this.style.cssText = "border-color:red";
      return;
    }
    if (
      inputEmail.value.slice(inputEmail.value.indexOf(".")).length < 2 ||
      inputEmail.value.slice(inputEmail.value.indexOf(".")).match(/[^A-Z]/gi)
        .length > 0 ||
      inputEmail.value.slice(
        inputEmail.value.indexOf("@"),
        inputEmail.value.indexOf(".")
      ).length >= 4
    ) {
      showError(
        "subdomain must contains from 2 letters of Lathin alphabit",
        inputEmail
      );
      this.style.cssText = "border-color:red";
      return;
    }
  }
  inputEmail.addEventListener("blur", validateEmail);
  inputEmail.addEventListener("focus", () => {
    document
      .querySelectorAll(".new-ticket-buy__eMail > div")
      .forEach((item) => item.remove());
  });
  selectedTime.addEventListener("change", changeTime);
  date.addEventListener("change", changeDate);
  selectedTicketType.addEventListener("change", changeBackgroundOnSelect);
  inputNumberContainer.addEventListener("click", calculateTotalAmount);
  selectedTicketType.addEventListener("change", calculateTotalAmount);

  const phoneNumberInput = document.querySelector(
    ".new-ticket-buy__number_input"
  );
  function validatePhoneNumber() {
    let value = phoneNumberInput.value;
    if (value === "") {
      this.style.cssText = "border-color=''";
      return;
    }
    if (!parseInt(value)) {
      showError("Phone number must contains numbers (1-9)", phoneNumberInput);
      this.style.cssText = "border-color:red";
    }
    if (value.split("").length > 10) {
      showError("Phone number must contains numbers (1-9)", phoneNumberInput);
      this.style.cssText = "border-color:red";
    }
    this.style.cssText = "border-color=''";
  }
  phoneNumberInput.addEventListener("blur", validatePhoneNumber);
  phoneNumberInput.addEventListener("focus", () => {
    document
      .querySelectorAll(".new-ticket-buy__number > div")
      .forEach((item) => item.remove());
  });
  const inputName = document.querySelector(".new-ticket-buy__nameInput");
  function validateName() {
    if (inputName.value === "") {
      this.style.cssText = "border-color=''";
      return;
    }
    if (inputName.value.includes(" ")) {
      this.style.cssText = "border-color=''";
      return;
    }
    if (inputName.value.length < 3 || inputName.value.length > 15) {
      showError("Name must contains from 3 to 15 letters", inputName);
      this.style.cssText = "border-color:red";
      return;
    }
    if (
      inputName.value.match(/\./) ||
      inputName.value.match(/\@/) ||
      inputName.value.match(/\#/) ||
      inputName.value.match(/\^/) ||
      inputName.value.match(/\&/) ||
      inputName.value.match(/\*/) ||
      inputName.value.match(/\(/) ||
      inputName.value.match(/\)/) ||
      inputName.value.match(/\\/) ||
      inputName.value.match(/\$/) ||
      inputName.value.match(/\%/)
    ) {
      showError(
        "Name must contains letters of Cyrillic or Latin alphabets",
        inputName
      );
      return;
    }
  }
  inputName.addEventListener("blur", validateName);
  inputName.addEventListener("focus", () => {
    document
      .querySelector("div.new-ticket-buy__name > div:nth-child(2)")
      .remove();
  });
};

popUpCalculator();

//!======================ripple_effect======================//

const ripple = () => {
  const bookButton = document.querySelector(".red_square");

  function addRipple(event) {
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;
    const poinerSize = 30;
    let effect = document.createElement("span");
    effect.classList.add("ripple");
    effect.style.left = x - bookButton.clientWidth - poinerSize / 2 + "px";
    effect.style.top = y - bookButton.clientHeight / 2 - poinerSize / 2 + "px";
    this.append(effect);
    setTimeout(() => effect.remove(), 1000);
  }
  bookButton.addEventListener("click", addRipple);
};
ripple();

//*=============================================================================MapBox===================
import { accesToken } from "./acssesToken.js";
import { jeoJson } from "./data.js";

mapboxgl.accessToken = accesToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  zoom: 16,
  center: [2.3364, 48.86091],
  pitch: 35,
  bearing: 10,
});

const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true,
});
map.addControl(nav, "top-right");
function creatPoiner(number, elem = "div") {
  for (let i = 0; i < number; i++) {
    let div = document.createElement(elem);
    div.classList.add("marker");
  }
}
jeoJson.features.forEach(function (marker) {
  new mapboxgl.Marker(creatPoiner(1))
    .setLngLat(marker.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        "<h3>" + marker.properties.title + "<h3><p>"
      )
    )

    .addTo(map);
});

//!=====================buttonScrollTop=================//
const circle = document.querySelector(".progress-ring__circle");

const circleProgress = (elem) => {
  const circleContainer = document.querySelector(".progress-ring");
  const arrowUp = document.querySelector(".progress-ring__arrowUp");
  const progress = circle;
  const radius = progress.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progress.style.strokeDasharray = `${circumference} ${circumference}`;
  progress.style.strokeDashoffset = circumference;
  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progress.style.strokeDashoffset = offset;
  }
  document.addEventListener("scroll", function () {
    if (window.pageYOffset > document.documentElement.clientHeight) {
      circleContainer.classList.add("show");
      arrowUp.classList.add("show");
      const percet =
        ((window.pageYOffset + document.documentElement.clientHeight) * 100) /
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      setProgress(percet);
    } else {
      circleContainer.classList.remove("show");
      arrowUp.classList.remove("show");
    }
  });
  function scrollBy() {
    if (event.target !== arrowUp) return;
    window.scrollTo(0, 0);
  }
  document.addEventListener("click", scrollBy);
};
circleProgress(circle);

//!!-----------Restrict To ifrmames play=====================

console.log("Результаты самооценки 150");
console.log("Слайдер в секции Welcome +24");
console.log(
  "есть возможность перелистывания слайдов влево и вправо кликами по стрелкам +4"
);
console.log("Блок header +4");
console.log(
  "есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки +4"
);
console.log(
  "есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) +2"
);
console.log(
  "слайды перелистываются плавно с анимацией смещения вправо или влево +4"
);
console.log("перелистывание слайдов бесконечное (зацикленное) +4");
console.log(
  "при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) +2"
);
console.log(
  "при перелистывании слайдов кликами или свайпами меняется номер активного слайда +2"
);
console.log(
  "даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2"
);
console.log("Слайдер в секции Video +20");
console.log(
  "при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят +2"
);
console.log(
  "если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно +2"
);
console.log(
  "есть возможность перелистывания слайдов влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео +2"
);
console.log(
  "есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео +2"
);
console.log(
  "слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) +2"
);
console.log("перелистывание слайдов бесконечное (зацикленное) +2");
console.log(
  "при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) +2"
);
console.log(
  "если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки 'Play' на панели управления и по центру видео меняются на первоначальные +2"
);
console.log(
  "даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2"
);
console.log("Кастомный видеоплеер +36");
console.log(
  "при клике по кнопке 'Play' слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на 'Pause', большая кнопка 'Play' по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка 'Play' по центру видео снова отображается +4"
);
console.log(
  'при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается +4'
);
console.log("Вёрстка соответствует макету. Ширина экрана 420px +40");
console.log("прогресс-бар отображает прогресс проигрывания видео +2");
console.log(
  "перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео +2"
);
console.log(
  "если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок 'Play' +2"
);
console.log(
  "при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) +2"
);
console.log(
  "при перемещении ползунка громкости звука изменяется громкость видео +2"
);
console.log(
  "если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой +2"
);
console.log(
  "если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой +2"
);
console.log(
  "при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима +2"
);
console.log(
  "панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними +2"
);
console.log("клавиша Пробел — пауза, при повторном нажатии - play +2");
console.log("Клавиша M (англ) — отключение/включение звука +2");
console.log("Клавиша F — включение/выключение полноэкранного режима +2");
console.log("Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика. +2");
console.log("Клавиши SHIFT+. (англ) — замедление воспроизведения ролика +2");
console.log("Слайдер сравнения изображений в секции Explore +10");
console.log("ползунок можно перетягивать мышкой по горизонтали +2");
console.log("ползунок никогда не выходит за границы картины +2");
console.log(
  "при перемещении ползунка справа налево плавно появляется нижняя картина +2"
);
console.log(
  "при перемещении ползунка слева направо плавно появляется верхняя картина +2"
);
console.log(
  "при обновлении страницы ползунок возвращается в исходное положение +2"
);
console.log("Анимация при прокрутке изображений в секции Galery +8");
console.log(
  "при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. +4"
);
console.log(
  "если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется +2"
);
console.log(
  "при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется +2"
);
console.log(
  "при изменении количества билетов Basic и Senior пересчитывается общая цена за них +4"
);
console.log(
  "у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них +4"
);
console.log("Калькулятор продажи билетов в форме продажи билетов +14");
console.log(
  "когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них +2"
);
console.log(
  "когда пользователь выбирает дату в форме слева, она отображается в билете справа +2"
);
console.log(
  "когда пользователь выбирает время в форме слева, оно отображается в билете справа +2"
);
console.log("время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут +2");
console.log(
  "можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа +2"
);
console.log(
  "можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа +2"
);
console.log("Валидация формы +16");
console.log(
  "валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы +4"
);
console.log(
  "валидация e-mail должна пропускать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв +4"
);
console.log(
  "валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр +4"
);
console.log(
  "при попытке ввода в input невалидного значения, его граница подсвечивается красным, выводится текстовое предупреждение в человекочитаемом формате +4"
);
console.log("Интерактивная карта в секции Contacts +12");
console.log("в секции Contacts добавлена интерактивная карта +4");
console.log(
  "на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету +4"
);
console.log("стиль карты соответствует макету +4");
console.log(
  "Добавлена кнопка прокрутки документа в самое начало, кнопка отражает % скрола страницы от её начала +10"
);

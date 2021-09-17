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

function OnButtonClock(event) {
  if (button) {
    document.body.classList.toggle("_lock");
    popup.classList.toggle("open");
    setTimeout(() => popupBody.classList.toggle("open"), 0);
  }
}
button.addEventListener("click", OnButtonClock);

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
document.addEventListener("click", closeBuyTictetsMouse);
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
  console.log(getHrefAndAlt);
  let sortedArray = getHrefAndAlt.sort(() => Math.random() - 0.5);
  console.log(sortedArray);
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

    if (scrollTop > 2800) {
      imgContainerLeft[0].classList.add("animated");
      imgContainerCenter[0].classList.add("animated");
      imgContainerRigtht[0].classList.add("animated");
    }
    if (scrollTop > 3400) {
      imgContainerLeft[1].classList.add("animated");
      imgContainerCenter[1].classList.add("animated");
      imgContainerRigtht[1].classList.add("animated");
    }
    if (scrollTop > 3800) {
      imgContainerLeft[2].classList.add("animated");
      imgContainerCenter[2].classList.add("animated");
      imgContainerRigtht[2].classList.add("animated");
    }
    if (scrollTop > 4200) {
      imgContainerLeft[3].classList.add("animated");
      imgContainerCenter[3].classList.add("animated");
      imgContainerRigtht[3].classList.add("animated");
    }
  }
  window.addEventListener("scroll", addClass);
};

animated(arrayOfContainers);

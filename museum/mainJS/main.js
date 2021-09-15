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
const slider = document.querySelector(".promo-slider__oneline");
const sliderOneLine = document.querySelector(".promo-slider__oneline");
const img = document.querySelector(".promo-slider__img>img");
const hrefArray = [
  "./assets/img/welcome/1.jpg",
  "./assets/img/welcome/2.jpg",
  "./assets/img/welcome/3.jpg",
  "./assets/img/welcome/4.jpg",
  "./assets/img/welcome/5.jpg",
];
const arrowPrew = document.querySelector(".arrow__prew");
const arrowNext = document.querySelector(".arrow__next");
const squares = document.querySelectorAll(".curren__checked");
function slide() {}

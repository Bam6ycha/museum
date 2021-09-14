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

const link = document.querySelectorAll(".header-navigation-link");
function onMenuListClock(event) {
  if (icon.classList.contains("_active")) {
    document.body.classList.remove("_lock");
    icon.classList.remove("_active");
    menuBody.classList.remove("_active");
  }
}
link.forEach((links) => links.addEventListener("click", onMenuListClock));

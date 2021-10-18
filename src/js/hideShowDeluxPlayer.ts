import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function hideShowDeluxe() {
  const deluxePlayerOn = document.querySelector(
    ".settings-container__deluxePlayer > button.on"
  ) as HTMLButtonElement;
  const deluxePlayerOff = document.querySelector(
    ".settings-container__deluxePlayer > button.off"
  ) as HTMLButtonElement;
  const songName = document.querySelector(
    ".header-audio-player__songName"
  ) as HTMLDivElement;
  const progressBarContainer = document.querySelector(
    ".progressBar"
  ) as HTMLDivElement;
  const progressBarLinearGradient = document.querySelector(
    ".linearGradient"
  ) as HTMLDivElement;
  const duration = document.querySelector(".duration") as HTMLDivElement;
  const sound = document.querySelector(".sound") as HTMLDivElement;
  const soundBar = document.querySelector(".soundBar") as HTMLInputElement;

  const elementsOfPlayer = [
    songName,
    progressBarContainer,
    progressBarLinearGradient,
    duration,
    sound,
    soundBar,
  ];
  toggle(elementsOfPlayer, deluxePlayerOn, deluxePlayerOff, "DeluxePlayer");

  window.addEventListener("DOMContentLoaded", () => {
    elementsOfPlayer.forEach(
      (item) =>
        (item.style.opacity =
          localStorage.getItem("opacityDeluxePlayer") ?? OpacityValues.On)
    );

    if (localStorage.getItem("opacityDeluxePlayer") === "1") {
      deluxePlayerOn?.classList.add("turnOn");
      deluxePlayerOff?.classList.add("turnOff");
      elementsOfPlayer.forEach((item) => (item.style.visibility = ""));
    }

    if (localStorage.getItem("opacityDeluxePlayer") === "0") {
      deluxePlayerOn?.classList.add("turnOff");
      deluxePlayerOff?.classList.add("turnOn");
      elementsOfPlayer.forEach((item) => (item.style.visibility = "hidden"));
    }
  });

  deluxePlayerOn.addEventListener("click", () =>
    toggle(elementsOfPlayer, deluxePlayerOn, deluxePlayerOff, "DeluxePlayer")
  );

  deluxePlayerOff.addEventListener("click", () =>
    toggle(elementsOfPlayer, deluxePlayerOn, deluxePlayerOff, "DeluxePlayer")
  );
}

hideShowDeluxe();

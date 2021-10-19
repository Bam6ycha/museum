import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function showHideTime() {
  const timeContainer = document.querySelector(
    ".current-time"
  ) as HTMLDivElement;
  const showTimeButtonOn = document.querySelector(
    ".settings-container__time > button.on"
  ) as HTMLButtonElement;
  const showTimeButtonOff = document.querySelector(
    ".settings-container__time > button.off"
  ) as HTMLButtonElement;
  toggle([timeContainer], showTimeButtonOn, showTimeButtonOff, "Time");

  window.addEventListener("DOMContentLoaded", () => {
    timeContainer.style.opacity =
      localStorage.getItem("opacityTime") ?? OpacityValues.On;
    toggle([timeContainer], showTimeButtonOn, showTimeButtonOff, "Time");
    if (localStorage.getItem("opacityTime") === OpacityValues.On) {
      showTimeButtonOn?.classList.add("turnOn");
      showTimeButtonOff?.classList.add("turnOff");
      timeContainer.style.visibility = "";
    }
    if (localStorage.getItem("opacityTime") === OpacityValues.Off) {
      showTimeButtonOn?.classList.add("turnOff");
      showTimeButtonOff?.classList.add("turnOn");
      timeContainer.style.visibility = "hidden";
    }
  });
  showTimeButtonOn?.addEventListener("click", () =>
    toggle([timeContainer], showTimeButtonOn, showTimeButtonOff, "Time")
  );
  showTimeButtonOff?.addEventListener("click", () =>
    toggle([timeContainer], showTimeButtonOn, showTimeButtonOff, "Time")
  );
}

showHideTime();

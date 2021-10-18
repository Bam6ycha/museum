import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function showhideCurrentDate() {
  const currentDate = document.querySelector(".current-date") as HTMLDivElement;
  const currentDateButtonOn = document.querySelector(
    ".settings-container__date > button.on"
  ) as HTMLButtonElement;
  const currentDateButtonOff = document.querySelector(
    ".settings-container__date > button.off"
  ) as HTMLButtonElement;
  toggle([currentDate], currentDateButtonOn, currentDateButtonOff, "Date");

  window.addEventListener("DOMContentLoaded", () => {
    currentDate.style.opacity = `${localStorage.getItem("opacityDate")}`;
    toggle([currentDate], currentDateButtonOn, currentDateButtonOff, "Date");
    if (localStorage.getItem("opacityDate") === OpacityValues.On) {
      currentDateButtonOn?.classList.add("turnOn");
      currentDateButtonOff?.classList.add("turnOff");
      currentDate.style.visibility = "";
    }
    if (localStorage.getItem("opacityDate") === OpacityValues.Off) {
      currentDateButtonOn?.classList.add("turnOff");
      currentDateButtonOff?.classList.add("turnOn");
      currentDate.style.visibility = "hidden";
    }
  });
  currentDateButtonOn?.addEventListener("click", () =>
    toggle([currentDate], currentDateButtonOn, currentDateButtonOff, "Date")
  );
  currentDateButtonOff?.addEventListener("click", () =>
    toggle([currentDate], currentDateButtonOn, currentDateButtonOff, "Date")
  );
}

showhideCurrentDate();

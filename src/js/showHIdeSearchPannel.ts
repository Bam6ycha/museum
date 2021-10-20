import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function showHideSearchPannel() {
  const searcPannel = document.querySelector(
    ".form-control"
  ) as HTMLInputElement;
  const searchPannelOn = document.querySelector(
    ".settings-container__searchPannel > button.on"
  ) as HTMLButtonElement;
  const searchPannelOff = document.querySelector(
    ".settings-container__searchPannel > button.off"
  ) as HTMLButtonElement;

  toggle([searcPannel], searchPannelOn, searchPannelOff, "SearchPannel");
  window.addEventListener("DOMContentLoaded", () => {
    searcPannel.style.opacity =
      localStorage.getItem("opacitySearchPannel") ?? OpacityValues.On;
    toggle([searcPannel], searchPannelOn, searchPannelOff, "SearchPannel");
    if (localStorage.getItem("opacitySearchPannel") === OpacityValues.On) {
      searchPannelOn?.classList.add("turnOn");
      searchPannelOff?.classList.add("turnOff");
      searcPannel.style.visibility = "";
    }
    if (localStorage.getItem("opacitySearchPannel") === OpacityValues.Off) {
      searchPannelOn?.classList.add("turnOff");
      searchPannelOff?.classList.add("turnOn");
      searcPannel.style.visibility = "hidden";
    }
  });
  searchPannelOn?.addEventListener("click", () =>
    toggle([searcPannel], searchPannelOn, searchPannelOff, "SearchPannel")
  );
  searchPannelOff?.addEventListener("click", () =>
    toggle([searcPannel], searchPannelOn, searchPannelOff, "SearchPannel")
  );
}
showHideSearchPannel();

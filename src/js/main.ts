import "../index.html";

import "../scss/main.scss";
import { setTimer } from "./setTimer";

import { createSettingsPage } from "./settings";

import { soundSettings } from "./soundSettings";

import { toggleSoundButton } from "./toggleSoundButton";

const settingsButton = document.querySelector(
  ".footer-settings"
) as HTMLDivElement;
settingsButton.addEventListener("click", () => {
  createSettingsPage();
  const settingsPageContainer = document.querySelector(
    ".settings"
  ) as HTMLDivElement;
  function hasClass() {
    if (settingsPageContainer.classList.contains("from-left")) {
      return true;
    }
    return false;
  }
  function showSettingsPage() {
    if (!hasClass()) {
      settingsPageContainer.classList.add("from-left");
      settingsPageContainer.addEventListener("animationend", function () {
        this.classList.remove("from-left");
        this.classList.remove("hidden");
      });
    }
  }
  showSettingsPage();
  toggleSoundButton();
  soundSettings();
  setTimer();
});

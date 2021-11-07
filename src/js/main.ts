import "../index.html";

import "../scss/main.scss";
import "../js/audioPlayer/playerConfiguration";

import { SettingsPage } from "./settingsPage/Page";

const settingsPage = new SettingsPage();

document.body.append(settingsPage.element);

const settingsButton = document.querySelector(
  ".footer-settings"
) as HTMLDivElement;

settingsButton.addEventListener("click", () => {
  settingsPage.show();
});

settingsPage.toggleCheckBox();
document.addEventListener(
  "DOMContentLoaded",
  () => settingsPage.toggleCheckBox
);

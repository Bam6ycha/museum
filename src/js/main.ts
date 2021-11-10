import "../index.html";

import "../scss/main.scss";
import { ArtisQuizPage } from "./artistQuiz/ArtistQuizPage";

import { SettingsPage } from "./settingsPage/Page";

const settingsPage = new SettingsPage();

const artisQuizPage = new ArtisQuizPage();

document.body.append(artisQuizPage.element);

document.body.append(settingsPage.element);

const settingsButton = document.querySelector(
  ".footer-settings"
) as HTMLDivElement;

settingsButton.addEventListener("click", () => {
  settingsPage.show();
});

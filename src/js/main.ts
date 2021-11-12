import "../index.html";

import "../scss/main.scss";
import { ArtisQuizPage } from "./artistQuiz/ArtistQuizPage";
import { QusetionPage } from "./qrtisQuizQuestions/QestionPage";

import { SettingsPage } from "./settingsPage/Page";

const settingsPage = new SettingsPage();

const artisQuizPage = new ArtisQuizPage();

const artisqQuizQuestionsPage = new QusetionPage();

document.body.append(artisQuizPage.element);

document.body.append(settingsPage.element);

document.body.append(artisqQuizQuestionsPage.element);

const settingsButton = document.querySelector(
  ".footer-settings"
) as HTMLDivElement;

settingsButton.addEventListener("click", () => {
  settingsPage.show();
});

const artisQuizButton = document.querySelector(
  ".artist-quiz__imgContainer"
) as HTMLDivElement;

artisQuizButton.addEventListener("click", () => artisQuizPage.showPage());

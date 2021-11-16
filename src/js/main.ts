import "../index.html";

import "../scss/main.scss";
import { ArtisQuizPage } from "./artistQuiz/ArtistQuizPage";
import { PictureQuiz } from "./pictureQuiz/PictureQuizPage";
import { PictureQuizPage } from "./pictureQuizeQuestions/pictireQuestionPage";
import { QusetionPage } from "./qrtisQuizQuestions/QestionPage";

import { SettingsPage } from "./settingsPage/Page";
import { utilites } from "./Utilities";

const settingsPage = new SettingsPage();

const artisQuizPage = new ArtisQuizPage();

const artisqQuizQuestionsPage = new QusetionPage();

const pictureQuizPage = new PictureQuiz();

const pictureQusetionPage = new PictureQuizPage();

document.body.append(artisQuizPage.element);

document.body.append(settingsPage.element);

document.body.append(artisqQuizQuestionsPage.element);

document.body.append(pictureQuizPage.element);

document.body.append(pictureQusetionPage.element);

const settingsButton = document.querySelector(
  ".footer-settings"
) as HTMLDivElement;

settingsButton.addEventListener("click", () => {
  settingsPage.show();
});

const artisQuizButton = document.querySelector(
  ".artist-quiz__imgContainer"
) as HTMLDivElement;

const pictureQuizButton = document.querySelector(
  ".artist-quiz>div:nth-child(2)"
);

artisQuizButton.addEventListener("click", () => artisQuizPage.showPage());
pictureQuizButton?.addEventListener("click", () => pictureQuizPage.showPage());

artisqQuizQuestionsPage.hideQuestionPageShowHome(() => {
  const [score] = artisqQuizQuestionsPage.getScoreAndCounder();
  artisQuizPage.addScore(score);
  artisqQuizQuestionsPage.hideQuestionPage();
});

artisqQuizQuestionsPage.hideQuestionPageShowCategories(() => {
  const [score] = artisqQuizQuestionsPage.getScoreAndCounder();

  artisqQuizQuestionsPage.hideQuestionPage();
  artisQuizPage.showPage();

  artisQuizPage.addScore(score);
});

artisqQuizQuestionsPage.showCategoriesPage(() => {
  artisqQuizQuestionsPage.hideQuestionPage();
  artisQuizPage.showPage();
});

artisQuizPage.showQuestionPage(async () => {
  await artisqQuizQuestionsPage.startQuiz(
    utilites.randomNumberGapArtistQuiz()[0]
  );
  artisQuizPage.hidePage();
  artisqQuizQuestionsPage.showQuestionPage();
});

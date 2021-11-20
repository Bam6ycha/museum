import "../index.html";

import "../scss/main.scss";

import "../assets/correct.mp3";
import "../assets/incorrect.mp3";
import "../assets/roundEnd.mp3";

import { ArtisQuizPage } from "./artistQuiz/ArtistQuizPage";
import { PictureQuiz } from "./pictureQuiz/PictureQuizPage";
import { PictureQuizPage } from "./pictureQuizeQuestions/pictireQuestionPage";
import { QusetionPage } from "./qrtisQuizQuestions/QestionPage";
import { ScorePage } from "./scoreArtist/scorePage";
import { ScorePicturePage } from "./scorePictures/scorePicturePage";

import { SettingsPage } from "./settingsPage/Page";
import { utilites } from "./Utilities";

const settingsPage = new SettingsPage();

const artisQuizPage = new ArtisQuizPage();

const artisqQuizQuestionsPage = new QusetionPage();

const pictureQuizPage = new PictureQuiz();

const pictureQusetionPage = new PictureQuizPage();

const scorePageArtist = new ScorePage("score-page");

const scorePagePictures = new ScorePicturePage("score-page");

document.body.append(artisQuizPage.element);

document.body.append(settingsPage.element);

document.body.append(artisqQuizQuestionsPage.element);

document.body.append(pictureQuizPage.element);

document.body.append(pictureQusetionPage.element);

document.body.append(scorePageArtist.element);

document.body.append(scorePagePictures.element);

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
) as HTMLDivElement;

artisQuizButton.addEventListener("click", () => artisQuizPage.showPage());
pictureQuizButton.addEventListener("click", () => pictureQuizPage.showPage());

artisqQuizQuestionsPage.hideQuestionPageShowHome(() => {
  const [score] = artisqQuizQuestionsPage.getScore();
  artisQuizPage.addScore(score);
  artisqQuizQuestionsPage.hideQuestionPage();
});

artisqQuizQuestionsPage.hideQuestionPageShowCategories(() => {
  const [score] = artisqQuizQuestionsPage.getScore();

  artisqQuizQuestionsPage.hideQuestionPage();
  artisQuizPage.showPage();

  artisQuizPage.addScore(score);
});

artisqQuizQuestionsPage.showCategoriesPage(() => {
  artisqQuizQuestionsPage.hideQuestionPage();
  artisQuizPage.showPage();
});

artisQuizPage.showQuestionPage(async ({ target }) => {
  const footer = artisQuizPage.cardsFooter();
  for (let i = 0; i < footer.length; i++) {
    if (target === footer[i]) {
      return;
    }
  }
  await artisqQuizQuestionsPage.startQuiz(
    utilites.randomNumberGapArtistQuiz()[0]
  );
  artisQuizPage.hidePage();
  artisqQuizQuestionsPage.showQuestionPage();
});

pictureQusetionPage.showCategoriesPage(() => {
  pictureQusetionPage.hideQuestionPage();
  pictureQuizPage.showPage();
});

pictureQusetionPage.showHomePage(() => {
  pictureQusetionPage.hideQuestionPage();
});

pictureQuizPage.showQuestionPage(async ({ target }) => {
  const footer = pictureQuizPage.cardsFooter();
  for (let i = 0; i < footer.length; i++) {
    if (target === footer[i]) {
      return;
    }
  }
  await pictureQusetionPage.startQuiz();
  await pictureQusetionPage.showQuestionPage();
  pictureQuizPage.hidePage();
});

pictureQusetionPage.hideQuestionPageShowCategories(() => {
  const [score] = pictureQusetionPage.getScore();
  pictureQusetionPage.hideQuestionPage();
  pictureQuizPage.showPage();
  pictureQuizPage.addScore(score);
});

pictureQusetionPage.hideQuestionPageShowHome(() => {
  const [score] = pictureQusetionPage.getScore();
  pictureQuizPage.addScore(score);
  pictureQusetionPage.hideQuestionPage();
});

artisQuizPage.onScoreClick(async () => {
  await scorePageArtist.showScore();
  artisQuizPage.hidePage();
  scorePageArtist.showPage();
});

scorePageArtist.hideShowCategories(() => {
  setTimeout(() => scorePageArtist.resetCardsState(), 600);
  scorePageArtist.hidePage();
  artisQuizPage.showPage();
});

pictureQuizPage.onScoreClick(async () => {
  await scorePagePictures.showScore();
  pictureQuizPage.hidePage();
  scorePagePictures.showPage();
});

scorePagePictures.hideShowCategories(() => {
  setTimeout(() => scorePagePictures.resetCardsState(), 600);
  scorePagePictures.hidePage();
  pictureQuizPage.showPage();
});

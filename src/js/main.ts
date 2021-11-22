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

console.log("Итого 210 баллов");

console.log("Стартовая страница и навигация +20");
console.log("Настройки +40");
console.log(
  "в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10"
);
console.log(
  "в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10"
);
console.log(
  "в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10"
);
console.log(
  "при перезагрузке страницы приложения выбранные настройки сохраняются +10"
);
console.log("Страница категорий +30");
console.log(
  "карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10"
);
console.log(
  "вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +10"
);
console.log(
  "на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10"
);
console.log("Страница с вопросами +50");
console.log("варианты ответов на вопросы генерируются случайным образом +10");
console.log(
  "правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10"
);
console.log(
  "после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой Продолжить. При клике по кнопке Продолжить пользователь переходит к следующему вопросу категории +10"
);
console.log(
  "после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка Продолжить при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10"
);
console.log("Страница с результатами +50");
console.log(
  "вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +10"
);
console.log(
  "страница с результатами содержит превью всех картин категории +10"
);
console.log(
  "картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10"
);
console.log(
  "при клике по картине выводится информация о ней - название, автор, год создания +10"
);
console.log(
  "если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10"
);
console.log(
  "Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10"
);
console.log(
  "Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком +20"
);

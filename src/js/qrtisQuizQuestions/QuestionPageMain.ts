import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";
import { ContainerBullets } from "../Container/ContainerBullets";
import { FinalResults } from "../FinalResutls";
import { utilites } from "../Utilities";
import { PictureDescription } from "./pictureDescriptionPage";
import {
  OpacityClassNames,
  OpacityValues,
  AnswerDescriptionState
} from "../enums";

export class QuestionsPageMain {
  public element: HTMLDivElement;

  private mainContainer: Container;

  private imgContainer: Container;

  private bulletsContainer: ContainerBullets;

  private answerContainer: Container;

  private answerDescription: PictureDescription;

  public answerContainers: HTMLDivElement[];

  private score: number;

  private random: number;

  private min: number;

  private max: number;

  private indexOfRightAnswer: number;

  private finalResutl: FinalResults;

  constructor() {
    [this.min, this.max] = utilites.randomNumberGapArtistQuiz();
    this.random = utilites.getRandomNumber(this.min, this.max);
    this.score = 0;

    this.finalResutl = new FinalResults("final-resultsPage");
    this.answerDescription = new PictureDescription(
      "pictureDescriptionPage"
    ).addClassName("hidden");

    this.indexOfRightAnswer = 0;

    this.answerContainers = this.creatAnswerContainers();

    this.answerContainer = new Container(
      "artistQuizQuestions-mainContainer__answersContainer",
      [...this.answerContainers]
    );

    this.answerContainer.setOpacity(OpacityValues.Visible);

    this.bulletsContainer = new ContainerBullets(
      "artistQuizQuestions-mainContainer__bullets"
    );

    this.imgContainer = new Container(
      "artistQuizQuestions-mainContainer__imgContainer"
    );
    this.imgContainer.setOpacity(OpacityValues.Visible);

    this.mainContainer = new Container("artistQuizQuestions-mainContainer", [
      this.imgContainer.element,
      this.bulletsContainer.element,
      this.answerContainer.element,
      this.answerDescription.element,
      this.finalResutl.element
    ]);

    this.mainContainer.addClassName("show");
    this.element = this.mainContainer.element;
    this.addAnswers(this.min);
    this.showResult();
    this.nextQuestion();
  }

  protected creatAnswerContainers(amount = 4) {
    const answerContainers: HTMLDivElement[] = [];
    for (let i = 0; i < amount; i++) {
      const conteiner = new Container(
        "artistQuizQuestions-mainContainer__answer"
      );
      answerContainers.push(conteiner.element);
    }
    return answerContainers;
  }

  private async getImage(order: number) {
    const image = await utilites.getImg(order);
    const imageForDescription = await utilites.getImg(order);
    this.answerDescription.setImg(imageForDescription);
    this.imgContainer.append(image);
  }

  public async getRightAnswer(order: number) {
    const { author, name, year } = await utilites.getAuthor(order);

    return [author, name, year];
  }

  public async getAnswerOptions() {
    const responses = [];
    const maxAuthorAmount = 200;
    for (let i = 0; i < 3; i++) {
      const random = utilites.getRandomNumber(this.max + 2, maxAuthorAmount);
      const response = utilites.getAuthor(random);
      responses.push(response);
    }
    const results = await Promise.all(responses);
    const authors: string[] = [];
    results.forEach(({ author }) => authors.push(author));

    return authors;
  }

  private async addAnswers(order: number) {
    const description: string[] = await this.getRightAnswer(order);
    const author = description[0];
    const wrongAnswers = await this.getAnswerOptions();
    const answers: string[] = [author, ...wrongAnswers];
    utilites.shuffle(answers);
    this.indexOfRightAnswer = answers.indexOf(author);
    this.answerContainers.forEach(
      (container, index) => (container.textContent = answers[index])
    );
    this.answerDescription.addDescription(description);
    return answers;
  }

  public hide() {
    if (this.imgContainer.getOpacity() === OpacityValues.Visible) {
      this.imgContainer.addClassName(OpacityClassNames.Invisible);
      this.answerContainer.addClassName(OpacityClassNames.Invisible);
      setTimeout(() => {
        this.imgContainer.setOpacity(OpacityValues.Invisible);
        this.answerContainer.setOpacity(OpacityValues.Invisible);
        this.imgContainer.removeClassName(OpacityClassNames.Invisible);
        this.answerContainer.removeClassName(OpacityClassNames.Invisible);
      }, 500);
    }
  }

  private increaseScore() {
    this.score += 1;
  }

  private resetScore() {
    this.score = 0;
  }

  public show() {
    if (this.imgContainer.getOpacity() === OpacityValues.Invisible) {
      this.imgContainer.addClassName(OpacityClassNames.Visible);
      this.answerContainer.addClassName(OpacityClassNames.Visible);
    }
    setTimeout(() => {
      this.imgContainer.setOpacity(OpacityValues.Visible);
      this.answerContainer.setOpacity(OpacityValues.Visible);
      this.imgContainer.removeClassName(OpacityClassNames.Visible);
      this.answerContainer.removeClassName(OpacityClassNames.Visible);
    }, 500);
  }

  public showWrongAnswer() {
    player.incorrectAnswerSound();
    this.bulletsContainer.showNextActive();
    this.bulletsContainer.showWrongAnswer();
    this.answerDescription.showResult(AnswerDescriptionState.Wrong);
  }

  public showRightAnswer() {
    player.playCorrect();
    this.bulletsContainer.showNextActive();
    this.bulletsContainer.showRightAnswer();
    this.answerDescription.showResult(AnswerDescriptionState.Right);
    this.increaseScore();
  }

  public showResult(action?: CallableFunction) {
    this.answerContainers.forEach((answer) => {
      answer.addEventListener("click", ({ target }) => {
        if (!target && action) {
          action();
        }

        if (
          this.answerContainers.indexOf(target as HTMLDivElement) ===
          this.indexOfRightAnswer
        ) {
          this.showRightAnswer();
        } else {
          this.showWrongAnswer();
        }
      });
    });
  }

  public removeQuestionImage() {
    const image = this.imgContainer.element.children;
    if (image.length > 1) {
      image[0].remove();
    }
  }

  public async startQuiz(number: number) {
    await this.getImage(number);
    await this.addAnswers(number);
    [this.min, this.max] = utilites.randomNumberGapArtistQuiz();
    this.answerDescription.removeImage();
    this.removeQuestionImage();
    this.bulletsContainer.resetState();
    this.bulletsContainer.updateState();
    this.resetScore();
  }

  public resetTimer(listener: EventListener) {
    this.answerDescription.nextQuestion(listener);
  }

  private nextQuestion() {
    this.answerDescription.nextQuestion(() => {
      this.hide();
      ++this.min;
      setTimeout(async () => {
        await this.getImage(this.min);
        this.removeQuestionImage();
        this.answerDescription.removeImage();
        await this.addAnswers(this.min);
        this.show();
        this.endGame();
      }, 1000);
    });
  }

  public endGame() {
    if (this.bulletsContainer.getCounter() === 10) {
      this.finalResutl.showFinalResult();
      this.finalResutl.setTotal(`${this.score}`);
      player.playEndRound();
    }
  }

  public getScore() {
    return [this.score];
  }

  public hideQuestionPageShowHomePage(listener: EventListener) {
    this.finalResutl.hideQuestionPageShowHomePage(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.finalResutl.hideQuestionPageShowCategories(listener);
  }
}

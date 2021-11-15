import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";
import { ContainerBullets } from "../Container/ContainerBullets";
import { FinalResults } from "../FinalResutls";
import { utilites } from "../Utilities";
import { PictureDescription } from "./pictureDescriptionPage";
import {
  OpacityClasses,
  OpacityValues,
  AnswerDescriptionState
} from "../enums";

export class QuestionsPageMain {
  public element: HTMLDivElement;

  private mainContainer: Container;

  private imgContainer: Container;

  private bulletsContainer: ContainerBullets;

  private answerContainer: Container;

  private answerDiscription: PictureDescription;

  public answerContainers: HTMLDivElement[];

  private score: number;

  private random: number;

  private min: number;

  private max: number;

  private indexofRightAnswer: number;

  private finalResutl: FinalResults;

  constructor() {
    [this.min, this.max] = utilites.randomNumberGap("ArtisQuizCategory");
    this.random = utilites.getRandomNumber(this.min, this.max);
    this.score = 0;

    this.finalResutl = new FinalResults("final-resultsPage");
    this.answerDiscription = new PictureDescription(
      "pictureDescriptionPage"
    ).addClassName("hidden");

    this.indexofRightAnswer = 0;

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
      this.answerDiscription.element,
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
    this.answerDiscription.setImg(imageForDescription);
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
    this.indexofRightAnswer = answers.indexOf(author);
    this.answerContainers.forEach(
      (container, index) => (container.textContent = answers[index])
    );
    this.answerDiscription.addDescription(description);
    return answers;
  }

  public makeInvisible() {
    if (this.imgContainer.getOpacity() === OpacityValues.Visible) {
      this.imgContainer.addClassName(OpacityClasses.Invisible);
      this.answerContainer.addClassName(OpacityClasses.Invisible);
      setTimeout(() => {
        this.imgContainer.setOpacity(OpacityValues.Invisible);
        this.answerContainer.setOpacity(OpacityValues.Invisible);
        this.imgContainer.removeClassName(OpacityClasses.Invisible);
        this.answerContainer.removeClassName(OpacityClasses.Invisible);
      }, 500);
    }
  }

  public makeVisible() {
    if (this.imgContainer.getOpacity() === OpacityValues.Invisible) {
      this.imgContainer.addClassName(OpacityClasses.Visible);
      this.answerContainer.addClassName(OpacityClasses.Visible);
    }
    setTimeout(() => {
      this.imgContainer.setOpacity(OpacityValues.Visible);
      this.answerContainer.setOpacity(OpacityValues.Visible);
      this.imgContainer.removeClassName(OpacityClasses.Visible);
      this.answerContainer.removeClassName(OpacityClasses.Visible);
    }, 500);
  }

  private showResult() {
    this.answerContainers.forEach((answer) => {
      answer.addEventListener("click", ({ target }) => {
        if (!target) {
          return;
        }
        if (
          this.answerContainers.indexOf(target as HTMLDivElement) ===
          this.indexofRightAnswer
        ) {
          player.playCorrect();
          this.bulletsContainer.rightAnswer();
          this.bulletsContainer.nextActive();
          this.answerDiscription.showResult(AnswerDescriptionState.right);
          this.score++;
        } else {
          player.playIncorrect();
          this.bulletsContainer.wrongAnswer();
          this.bulletsContainer.nextActive();
          this.answerDiscription.showResult(AnswerDescriptionState.wrong);
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
    [this.min, this.max] = utilites.randomNumberGap("ArtisQuizCategory");
    this.answerDiscription.removeImage();
    this.removeQuestionImage();
    this.bulletsContainer.nullifyCounter();
    this.bulletsContainer.updateBulletsState();
    this.score = 0;
  }

  private nextQuestion() {
    this.answerDiscription.nextQuestion(() => {
      this.makeInvisible();
      setTimeout(async () => {
        this.removeQuestionImage();
        ++this.min;
        await this.getImage(this.min);
        this.removeQuestionImage();
        this.answerDiscription.removeImage();
        await this.addAnswers(this.min);
        this.makeVisible();
        if (this.bulletsContainer.getCounter() === 10) {
          this.finalResutl.showFinalResult();
          this.finalResutl.setTotal(`${this.score}`);
          player.playEndRound();
        }
      }, 1000);
    });
  }

  public getScoreAndCounter() {
    return [this.score];
  }

  public hideQuestionPageShowHomePage(listener: EventListener) {
    this.finalResutl.hideQuestionPageShowHomePage(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.finalResutl.hideQuestionPageShowCategories(listener);
  }
}

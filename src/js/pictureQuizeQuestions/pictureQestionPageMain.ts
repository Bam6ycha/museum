import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";
import { ContainerBullets } from "../Container/ContainerBullets";
import { PictureQuizeImages } from "../Container/ConteinerImagesPictureQuize";
import {
  AnswerDescriptionState,
  OpacityClassNames,
  OpacityValues
} from "../enums";
import { FinalResults } from "../FinalResutls";
import { PictureDescription } from "../qrtisQuizQuestions/pictureDescriptionPage";
import { utilites } from "../Utilities";

export class PictureQustionPageMain {
  public element: HTMLDivElement;

  private mainContainer: Container;

  private imagesContainer: PictureQuizeImages;

  private bulletsContainer: ContainerBullets;

  private answerDescription: PictureDescription;

  private score: number;

  private random: number;

  private min: number;

  private max: number;

  private indexOfRightAnswer: number;

  private finalResult: FinalResults;

  private currentSessionAnswers: string[];

  private answers: Array<string[]>;

  constructor() {
    const answersJSON = localStorage.getItem("answers") ?? null;
    if (!answersJSON) {
      this.answers = [];
    } else {
      this.answers = JSON.parse(localStorage.getItem("answers") as string);
    }

    this.currentSessionAnswers = [];
    [this.min, this.max] = utilites.randomNumberGapPictureQuiz();
    this.random = utilites.getRandomNumber(this.min, this.max);
    this.score = 0;

    this.finalResult = new FinalResults("final-resultsPage");

    this.indexOfRightAnswer = 0;

    this.bulletsContainer = new ContainerBullets(
      "artistQuizQuestions-mainContainer__bullets"
    );

    this.answerDescription = new PictureDescription(
      "pictureDescriptionPage"
    ).addClassName("hidden");

    this.imagesContainer = new PictureQuizeImages(
      "pictureQuize-main__imageMainContainer"
    );
    this.imagesContainer.setOpacity(OpacityValues.Visible);

    this.mainContainer = new Container("pictureQuizQuestions-mainContainer", [
      this.imagesContainer.element,
      this.bulletsContainer.element,
      this.answerDescription.element,
      this.finalResult.element
    ]);

    this.element = this.mainContainer.element;
    this.getRandomImages();
    this.showResult();
    this.nextQuestion();
    this.setDescription();
  }

  private async getImage() {
    const image = await utilites.getImg(this.min);
    const descriptionImage = await utilites.getImg(this.min);
    this.answerDescription.setImg(descriptionImage);
    return image;
  }

  private async setDescription() {
    const { author, name, year } = await utilites.getAuthor(this.min);
    this.answerDescription.addDescription([author, name, year]);
  }

  private async getRandomImages() {
    const responses: Promise<HTMLImageElement>[] = [];
    const rightImage = await this.getImage();

    for (let i = 0; i < 3; i++) {
      const randomImageIndex = utilites.getRandomNumber(0, 240);
      const image = utilites.getImg(randomImageIndex);
      responses.push(image);
    }
    const results: HTMLImageElement[] = await Promise.all(responses);

    const images = [rightImage, ...results];
    utilites.shuffle(images);
    this.indexOfRightAnswer = images.indexOf(rightImage);
    this.imagesContainer.insertImages(images);
    return images;
  }

  public hide() {
    if (this.imagesContainer.getOpacity() === OpacityValues.Visible) {
      this.imagesContainer.addClassName(OpacityClassNames.Invisible);

      setTimeout(() => {
        this.imagesContainer.setOpacity(OpacityValues.Invisible);
        this.imagesContainer.removeClassName(OpacityClassNames.Invisible);
      }, 500);
    }
  }

  public show() {
    if (this.imagesContainer.getOpacity() === OpacityValues.Invisible) {
      this.imagesContainer.addClassName(OpacityClassNames.Visible);
    }
    setTimeout(() => {
      this.imagesContainer.setOpacity(OpacityValues.Visible);

      this.imagesContainer.removeClassName(OpacityClassNames.Visible);
    }, 500);
  }

  private increaseScore() {
    this.score += 1;
  }

  private resetScore() {
    this.score = 0;
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

  private showResult() {
    this.imagesContainer.onClick(({ target }) => {
      const children = this.imagesContainer.getChildren();

      if (!target) {
        return;
      }
      if (
        children.indexOf(target as HTMLImageElement) === this.indexOfRightAnswer
      ) {
        const questionNumber = this.bulletsContainer.getCounter();
        this.showRightAnswer();
        this.currentSessionAnswers[questionNumber] = "correct";
      } else {
        const questionNumber = this.bulletsContainer.getCounter();
        this.showWrongAnswer();
        this.currentSessionAnswers[questionNumber] = "incorrect";
      }
    });
  }

  public nextQuestion() {
    this.answerDescription.nextQuestion(() => {
      this.hide();
      ++this.min;
      setTimeout(async () => {
        this.imagesContainer.removeChildren();
        await this.getRandomImages();
        this.answerDescription.removeImage();
        this.setDescription();
        this.show();
        this.endGame();
      }, 1000);
    });
  }

  public async strartQuiz() {
    [this.min, this.max] = utilites.randomNumberGapPictureQuiz();
    await this.getRandomImages();
    await this.setDescription();
    this.answerDescription.removeImage();
    this.imagesContainer.removeChildren();
    this.bulletsContainer.resetState();
    this.bulletsContainer.updateState();
    this.resetScore();
  }

  private endGame() {
    if (this.bulletsContainer.getCounter() === 10) {
      const currentCategory = +(
        localStorage.getItem("PictureQuizCategory") ?? 0
      );
      this.finalResult.showFinalResult();
      this.finalResult.setTotal(`${this.score}`);
      player.playEndRound();
      this.answers[currentCategory] = this.currentSessionAnswers;
      localStorage.setItem("answers", JSON.stringify(this.answers));
      this.currentSessionAnswers = [];
    }
  }

  changeAuthor(listener: EventListener) {
    this.answerDescription.nextQuestion(listener);
  }

  public getMin() {
    return this.min;
  }

  public getScore() {
    return [this.score];
  }

  public hideQuestionPageShowHomePage(listener: EventListener) {
    this.finalResult.hideQuestionPageShowHomePage(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.finalResult.hideQuestionPageShowCategories(listener);
  }

  public resetTimer(listener: EventListener) {
    this.answerDescription.nextQuestion(listener);
  }
}

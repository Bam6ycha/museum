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

  constructor() {
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

  public makeInvisible() {
    if (this.imagesContainer.getOpacity() === OpacityValues.Visible) {
      this.imagesContainer.addClassName(OpacityClassNames.Invisible);
      // this.answerContainer.addClassName(OpacityClasses.Invisible);
      setTimeout(() => {
        this.imagesContainer.setOpacity(OpacityValues.Invisible);
        // this.answerContainer.setOpacity(OpacityValues.Invisible);
        this.imagesContainer.removeClassName(OpacityClassNames.Invisible);
        // this.answerContainer.removeClassName(OpacityClasses.Invisible);
      }, 500);
    }
  }

  public makeVisible() {
    if (this.imagesContainer.getOpacity() === OpacityValues.Invisible) {
      this.imagesContainer.addClassName(OpacityClassNames.Visible);
      // this.answerContainer.addClassName(OpacityClasses.Visible);
    }
    setTimeout(() => {
      this.imagesContainer.setOpacity(OpacityValues.Visible);
      // this.answerContainer.setOpacity(OpacityValues.Visible);
      this.imagesContainer.removeClassName(OpacityClassNames.Visible);
      // this.answerContainer.removeClassName(OpacityClasses.Visible);
    }, 500);
  }

  public showWrongAnswer() {
    player.incorrectAnswerSound();
    this.bulletsContainer.showWrongAnswer();
    this.bulletsContainer.showNextActive();
    this.answerDescription.showResult(AnswerDescriptionState.Wrong);
  }

  public showRightAnswer() {
    player.playCorrect();
    this.bulletsContainer.showRightAnswer();
    this.bulletsContainer.showNextActive();
    this.answerDescription.showResult(AnswerDescriptionState.Right);
    this.score++;
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
        this.showRightAnswer();
      } else {
        this.showWrongAnswer();
      }
    });
  }

  public nextQuestion() {
    this.answerDescription.nextQuestion(() => {
      this.makeInvisible();
      setTimeout(async () => {
        this.imagesContainer.removeChildren();
        ++this.min;
        await this.getRandomImages();
        this.answerDescription.removeImage();
        this.setDescription();
        this.makeVisible();
        //  this.endGame();
      }, 1000);
    });
  }

  changeAuthor(listener: EventListener) {
    this.answerDescription.nextQuestion(listener);
  }

  public getMin() {
    return this.min;
  }
}

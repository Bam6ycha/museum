import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";
import { ContainerBullets } from "../Container/ContainerBullets";
import { utilites } from "../Utilities";
import { PictureDescription } from "./pictureDescriptionPage";

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

  constructor() {
    [this.min, this.max] = utilites.randomNumberGap("ArtisQuizCategory");
    this.random = utilites.getRandomNumber(this.min, this.max);
    this.score = 0;
    this.answerDiscription = new PictureDescription(
      "pictureDescriptionPage"
    ).addClassName("hidden");

    this.answerContainers = this.creatAnswerContainers();

    this.answerContainer = new Container(
      "artistQuizQuestions-mainContainer__answersContainer",
      [...this.answerContainers]
    );

    this.bulletsContainer = new ContainerBullets(
      "artistQuizQuestions-mainContainer__bullets"
    );

    this.imgContainer = new Container(
      "artistQuizQuestions-mainContainer__imgContainer"
    );

    this.mainContainer = new Container("artistQuizQuestions-mainContainer", [
      this.imgContainer.element,
      this.bulletsContainer.element,
      this.answerContainer.element,
      this.answerDiscription.element
    ]);

    this.mainContainer.addClassName("show");
    this.element = this.mainContainer.element;
    this.getImage(this.random);
    this.addAnswers();
    this.showResult();
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
    const img = await this.imgContainer.getImg(order);
    this.imgContainer.append(img);
  }

  public async getRightAnswer(order: number) {
    const { author, name, year } = await utilites.getAuthor(order);
    return [author, name, year];
  }

  public async getAnswerOptions() {
    const responses = [];
    const maxAuthorAmount = 220;
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

  private async addAnswers() {
    const [author]: string[] = await this.getRightAnswer(this.random);
    const wrongAnswers = await this.getAnswerOptions();
    const answers: string[] = [author, ...wrongAnswers];
    utilites.shuffle(answers);
    this.answerContainers.forEach(
      (container, index) => (container.textContent = answers[index])
    );
    return answers;
  }

  private showResult() {
    this.answerContainers.forEach((answer) => {
      answer.addEventListener("click", async ({ target }) => {
        if (!target) {
          return;
        }
        
        );
      });
    });
  }
}

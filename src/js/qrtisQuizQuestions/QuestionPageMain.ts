import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";
import { ContainerBullets } from "../Container/ContainerBullets";
import { ContainerImg } from "../Container/ContainerImg";
import { utilites } from "../Utilities";
import { PictureDescription } from "./pictureDescriptionPage";

export class QuestionsPageMain {
  public element: HTMLDivElement;

  private mainContainer: Container;

  private imgContainer: ContainerImg;

  private bulletsContainer: ContainerBullets;

  private questionsContainer: Container;

  private answerDiscription: PictureDescription;

  private score: number;

  constructor() {
    this.score = 0;
    this.answerDiscription = new PictureDescription(
      "pictureDescriptionPage"
    ).addClassName("hidden");

    this.questionsContainer = new Container(
      "artistQuizQuestions-mainContainer__questionsContainer"
    );

    this.bulletsContainer = new ContainerBullets(
      "artistQuizQuestions-mainContainer__bullets"
    );

    this.imgContainer = new ContainerImg(
      "artistQuizQuestions-mainContainer__imgContainer",

      [this.bulletsContainer.element]
    );

    this.mainContainer = new Container("artistQuizQuestions-mainContainer", [
      this.imgContainer.element,
      this.questionsContainer.element,
      this.answerDiscription.element
    ]);

    this.mainContainer.addClassName("show");
    this.element = this.mainContainer.element;
    this.createImgAndAnswer();
    this.onAnswer();
  }

  public async createImgAndAnswer() {
    const [min, max] = utilites.randomNumberGap("artistQuizCategory");
    const randomNumber = utilites.getRandomNumber(min, max);
    const img = await this.imgContainer.getImg(randomNumber);
    const answerDescriptionImg = await this.imgContainer.getImg(randomNumber);
    this.imgContainer.append(img);
    this.answerDiscription.setImg(answerDescriptionImg);
    const rigthAnswer = await utilites.getAuthor(randomNumber);
    const answerDiscriptionChilds =
      this.answerDiscription.createChildElements();
    answerDiscriptionChilds[0].textContent = rigthAnswer.author;
    answerDiscriptionChilds[1].textContent = rigthAnswer.name;
    answerDiscriptionChilds[2].textContent = rigthAnswer.year;
    answerDiscriptionChilds.forEach((child) =>
      this.answerDiscription.addDescription(child)
    );
    const answers: string[] = [rigthAnswer.author];
    for (let i = 0; i < 3; i++) {
      const randomIndex = utilites.getRandomNumber(1, 200);
      const randomAutor = await utilites.getAuthor(randomIndex);
      answers.push(randomAutor.author);
    }

    utilites.shuffle(answers);

    localStorage.setItem(
      "RightAnswerAtristQuiz",
      `${answers.indexOf(rigthAnswer.author)}`
    );
    // const elementsCount = 4;
    // this.questionsContainer
    //   .cleateSomeElements(
    //     elementsCount,
    //     "artistQuizQuestions-mainContainer__questions"
    //   )
    //   .forEach((answer, index) => {
    //     this.questionsContainer.append(answer);
    //     answer.textContent = answers[index];
    //   });
  }

  public hideMainContainer() {
    this.mainContainer.addClassName("to-left");
    this.answerDiscription.hideResult();
    setTimeout(() => this.mainContainer.element.remove(), 1000);
  }

  public onAnswer() {
    this.questionsContainer.addListener("click", async ({ target }) => {
      if (!target) {
        return;
      }

      const children = Array.from(this.questionsContainer.element.children);
      const rightAnswer = +(localStorage.getItem("RightAnswerAtristQuiz") ?? 0);

      if (rightAnswer === children.indexOf(target as HTMLDivElement)) {
        this.bulletsContainer.rightAnswer();
        this.bulletsContainer.nextActive();
        this.answerDiscription.showResult("correct");
        player.playCorrect();
        this.score++;
      } else {
        this.bulletsContainer.nextActive();
        this.bulletsContainer.wrongAnswer();
        this.answerDiscription.showResult("wrong");
        player.playIncorrect();
      }
    });
  }

  public removeMainPage(listener: EventListener) {
    this.answerDiscription.removeMainPage(listener);
  }
}

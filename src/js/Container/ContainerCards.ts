import { cardsTitle } from "../cardsTitle";
import { ChildElement } from "../childElementType";
import { imgNumer } from "../defaultArtisQuizImg";
import { utilites } from "../Utilities";
import { Container } from "./Container";

export class ContainerCards extends Container {
  element: HTMLDivElement;

  cardsContainer: Container;

  cards: HTMLDivElement[];

  cardsDescription: HTMLDivElement[];

  cardsScore: HTMLDivElement[];

  constructor(className: string, children?: ChildElement[]) {
    super(className, children);

    this.cards = this.createCards();
    this.cardsDescription = this.addDescriptionToCard();
    this.cardsScore = this.addScoreToCard();

    this.addImagesToCard();

    this.cardsContainer = new Container("artistQuiz-main__cardsContainer", [
      ...this.cards
    ]);
    this.element = this.cardsContainer.element;
    this.determinateCategory();
  }

  public addDescriptionToCard() {
    const descriptionContainers = this.createCards(
      11,
      "artistQuiz__card_description"
    );
    const totalScore = this.addTotalScore();
    descriptionContainers.forEach((item, index) => {
      item.textContent = cardsTitle[index];
      item.append(totalScore[index]);
    });
    this.cards.forEach((card, index) =>
      card.append(descriptionContainers[index])
    );
    return descriptionContainers;
  }

  public addTotalScore() {
    const totalScoreContainers = this.createCards(
      11,
      "artistQuiz-main__totalScore"
    );
    totalScoreContainers.forEach((item) => (item.textContent = ""));
    return totalScoreContainers;
  }

  public async addImagesToCard() {
    const images = await this.createImages();
    this.cards.forEach((card, index) => card.append(images[index]));
  }

  public addScoreToCard() {
    const scoreContainers = this.createCards(11, "artistQuiz-main__score");
    scoreContainers.forEach((item) => (item.textContent = "SCORE"));
    this.cards.forEach((card, index) => card.append(scoreContainers[index]));
    return scoreContainers;
  }

  private async createImages(amount = 11) {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < amount; i++) {
      const image = await this.getImg(imgNumer[i]);
      images.push(image);
    }
    return images;
  }

  private createCards(amount = 11, className = "artistQuiz-main__card") {
    const cards: HTMLDivElement[] = [];
    for (let i = 0; i < amount; i++) {
      const card = new Container(className);
      cards.push(card.element);
    }
    return cards;
  }

  public determinateCategory() {
    this.cards.forEach((card) => {
      card.addEventListener("click", ({ target }) => {
        if (!target) {
          return;
        }

        localStorage.setItem(
          "ArtisQuizCategory",
          `${this.cards.indexOf(card)}`
        );
      });
    });
  }
}

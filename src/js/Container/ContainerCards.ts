import { cardsTitle } from "../cardsTitle";
import { ChildElement } from "../childElementType";
import { Card } from "../components/Card";
import { imgNumer } from "../defaultArtisQuizImg";
import { utilites } from "../Utilities";
import { Container } from "./Container";

export class ContainerCards extends Container {
  element: HTMLDivElement;

  cardsContainer: Container;

  cards: Card[];

  constructor(className: string, children?: ChildElement[]) {
    super(className, children);

    this.cards = this.createCards();

    this.cardsContainer = new Container("artistQuiz-main__cardsContainer", [
      ...this.cards.map((card) => card.element)
    ]);

    this.element = this.cardsContainer.element;

    this.determinateCategory();
    this.addDescriptionToCard();
    this.addImages();
  }

  private addDescriptionToCard() {
    this.cards.forEach((item, index) => {
      item.addHeaderText(cardsTitle[index]);
    });
    return this;
  }

  public addTotalScore() {
    this.cards.forEach((card) => card.addScore(""));
    return this;
  }

  private async addImages() {
    this.cards.forEach(async (card, index) => {
      await card.addImage(imgNumer[index]);
    });
  }

  private createCards(amount = 11) {
    const cards: Card[] = [];
    for (let i = 0; i < amount; i++) {
      const card = new Card("artistQuiz-main__card");
      cards.push(card);
    }
    return cards;
  }

  private async createImages(amount = 11) {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < amount; i++) {
      const image = await utilites.getImg(imgNumer[i]);
      images.push(image);
    }
    return images;
  }

  public determinateCategory() {
    this.cards.forEach((card) => {
      card.addListener("click", ({ target }) => {
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

  public showQuestionPage(listener: EventListener) {
    this.cards.forEach((card) => card.addListener("click", listener));
  }
}

import { cardsTitle } from "../artisCardsTitle";
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
    this.domLoaded();
  }

  private addDescriptionToCard() {
    this.cards.forEach((item, index) => {
      item.addHeaderText(cardsTitle[index]);
    });
    return this;
  }

  public addTotalScore(score: number) {
    const necessaryCardIndex = +(
      localStorage.getItem("ArtisQuizCategory") ?? 0
    );
    this.cards.forEach((card, index) => {
      if (index === necessaryCardIndex) {
        card.addScore(`${score}`);
        card.addClassName("played");
      }
    });
    return this;
  }

  private async addImages() {
    this.cards.forEach(async (card, index) => {
      await card.addImage(imgNumer[index]);
    });
  }

  private createCards(amount = 12) {
    const cards: Card[] = [];
    for (let i = 0; i < amount; i++) {
      const card = new Card("artistQuiz-main__card");
      cards.push(card);
    }
    return cards;
  }

  private async createImages(amount = 12) {
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

  public cardFooter() {
    return this.cards.map((footer) => footer.getFooter());
  }

  public onScoreClick(listener: EventListener) {
    this.cards.forEach((footer) => footer.onScoreClick(listener));
  }

  private domLoaded() {
    document.addEventListener("DOMContentLoaded", () => {
      const answersJSON = localStorage.getItem("answers");
      const startPoint = 12;
      if (answersJSON) {
        const answers: Array<string[]> = JSON.parse(answersJSON);
        for (let index = startPoint; index < 24; index++) {
          if (answers[index]) {
            const rightAnswerAmount = answers[index].filter(
              (item) => item === "correct"
            ).length;
            this.cards[index - startPoint]
              .addScore(`${rightAnswerAmount}`)
              .addClassName("played");
          }
        }
      }
    });
  }
}

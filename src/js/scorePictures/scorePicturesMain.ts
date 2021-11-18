import { Card } from "../components/Card";
import { Container } from "../Container/Container";
import { utilites } from "../Utilities";

export class ScorePicturesMain extends Container {
  cards: Card[];

  cardsContainer: Container;

  images: Promise<HTMLImageElement[]>;

  constructor(className: string) {
    super(className);

    this.images = this.getImages();

    this.cards = this.createCards();

    this.cardsContainer = new Container("score-main__cardsContainer", [
      ...this.cards.map((card) => card.element)
    ]);
    this.element = this.cardsContainer.element;
    this.changeCardsState();
    this.addImagesToCards();
  }

  private createCards() {
    const cards: Card[] = [];

    for (let i = 0; i < 10; i++) {
      const card = new Card("score-main__card");
      cards.push(card);
    }
    return cards;
  }

  private async getImages() {
    const [min, max] = utilites.randomNumberGapPictureQuiz();
    const responses: Array<Promise<HTMLImageElement>> = [];

    for (let i = min; i <= max; i++) {
      const image = utilites.getImg(i);
      responses.push(image);
    }
    const results = await Promise.all(responses);

    return results;
  }

  private async addImagesToCards() {
    const images = await this.getImages();
    this.cards.forEach((card, index) => card.append(images[index]));
  }

  public changeCardsState() {
    const answersJSON = localStorage.getItem("answers");
    let answers: Array<string[]> = [];

    if (answersJSON) {
      answers = JSON.parse(answersJSON);
    }
    const artisQuizCategoriesAmount = 11;

    for (let i = 0; i < artisQuizCategoriesAmount; i++) {
      if (answers[i]) {
        const item = answers[i];
        item.forEach((answer, index) => {
          if (answer === "correct") {
            this.cards[index].addClassName("played");
          }
        });
      }
    }
  }
}

import { Container } from "../Container";

const imgNumer = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
export class ArtisQuizMain {
  element: HTMLDivElement;

  wrapper: Container;

  card: Container;

  cardDescriptionContainer: Container;

  constructor() {
    this.cardDescriptionContainer = new Container("artistQuiz__card");
    this.card = new Container("artistQuiz__card");

    this.creatCards();
    this.wrapper = new Container("artistQuiz-main", [this.card.element]);
    this.element = this.wrapper.element;
  }

  async creatCards() {
    const cards = await this.card.createSomeElementsWithImg(
      imgNumer.length,
      "artistQuiz-main__card"
    );
    cards.forEach((item) => this.card.append(item));
  }
}

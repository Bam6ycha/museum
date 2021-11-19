import { Card } from "../components/Card";
import { Container } from "../Container/Container";
import { utilites } from "../Utilities";

export class ScorePicturesMain extends Container {
  main: Container;

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

    this.main = new Container("score-main", [this.cardsContainer.element]);
    this.element = this.main.element;

    this.addImagesToCards();
    this.changeCardsState();
  }

  private async getDescription() {
    const respones: Array<
      Promise<{ author: string; name: string; year: string }>
    > = [];
    const [min, max] = utilites.randomNumberGapPictureQuiz();

    for (let i = min; i <= max; i++) {
      const response = utilites.getAuthor(i);
      respones.push(response);
    }
    const results = await Promise.all(respones);
    const authors = results.map((item) => item.author);
    const names = results.map((item) => item.name);
    const years = results.map((item) => item.year);

    return [authors, names, years];
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

  public async changeCardsState() {
    const answersJSON = localStorage.getItem("answers");
    let answers: Array<string[]> = [];
    const description = await this.getDescription();

    const authors = description[0];
    const names = description[1];
    const years = description[2];

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
            this.cards[index].addFooterText(
              `${authors[index]}${"\n"}${names[index]}${"\n"}${years[index]}`
            );
          }
        });
      }
    }
  }
}

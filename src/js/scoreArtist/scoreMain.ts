import { Card } from "../components/Card";
import { Container } from "../Container/Container";
import { utilites } from "../Utilities";

export class ScoreMain extends Container {
  main: Container;

  cards: Card[];

  cardsContainer: Container;

  constructor(className: string) {
    super(className);

    this.cards = this.createCards();

    this.cardsContainer = new Container("score-main__cardsContainer", [
      ...this.cards.map((card) => card.element)
    ]);

    this.main = new Container("score-main", [this.cardsContainer.element]);

    this.element = this.main.element;
  }

  private async getDescription(min: number, max: number) {
    const respones: Array<
      Promise<{ author: string; name: string; year: string }>
    > = [];

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

  private async getImages(min: number, max: number) {
    const responses: Array<Promise<HTMLImageElement>> = [];
    for (let i = min; i <= max; i++) {
      const image = utilites.getImg(i);
      responses.push(image);
    }
    const results = await Promise.all(responses);

    return results;
  }

  private async addImagesToCards(min: number, max: number) {
    const images = await this.getImages(min, max);
    this.cards.forEach((card, index) => card.append(images[index]));
  }

  public async changeCardsState(min: number, max: number) {
    const description = await this.getDescription(min, max);
    const authors = description[0];
    const names = description[1];
    const years = description[2];
    const answersJSON = localStorage.getItem("answers");
    let answers: Array<string[]> = [];

    if (answersJSON) {
      answers = JSON.parse(answersJSON);
    }
    const artisQuizCategoriesAmount = 12;

    const requiredСard = +(localStorage.getItem("ArtisQuizCategory") ?? 0);
    for (let i = artisQuizCategoriesAmount; i < 23; i++) {
      const currentCard = i - artisQuizCategoriesAmount;

      if (requiredСard === currentCard && answers[i]) {
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

  public hideCards() {
    this.cardsContainer.addClassName("to-bottom");
    this.cardsContainer.addListener("animationend", () => {
      this.cardsContainer
        .addClassName("hiddenBottom")
        .removeClassName("to-bottom")
        .removeClassName("showFromBottom");
    });
  }

  private showCards() {
    this.cardsContainer.addClassName("from-bottom");
    this.cardsContainer.addListener("animationend", () => {
      this.cardsContainer
        .addClassName("showFromBottom")
        .removeClassName("from-bottom")
        .removeClassName("hiddenBottom");
    });
  }

  async showScore() {
    setTimeout(async () => {
      this.resetCardsState();
      const [min, max] = utilites.randomNumberGapArtistQuiz();
      await this.addImagesToCards(min, max);
      await this.changeCardsState(min, max);
    }, 0);
    this.showCards();
  }

  public removeImages() {
    this.cards.forEach((card) => card.getimg().remove());
  }

  public resetCardsState() {
    this.cards.forEach((card) => card.removeClassName("played"));
    this.cards.forEach((card) => card.addFooterText());
  }
}

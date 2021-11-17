import { Card } from "../components/Card";
import { Container } from "../Container/Container";
import { utilites } from "../Utilities";

export class ScoreMain extends Container {
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
    const [min, max] = utilites.randomNumberGapArtistQuiz();
    const responses: Array<Promise<HTMLImageElement>> = [];

    for (let i = min; i <= max; i++) {
      const image = utilites.getImg(i);
      responses.push(image);
    }
    const results = await Promise.all(responses);
    return results;
    const answersJSON = localStorage.getItem("answers");
  
    if(answersJSON){
      const answers = JSON.parse(answersJSON);
      for
    }
  }

  private async addImagesToCards() {
    const images = await this.getImages();
    this.cards.forEach((card, index) => card.append(images[index]));
  }
    

}

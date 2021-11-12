import { cardsTitle } from "../cardsTitle";
import { ChildElement } from "../childElementType";
import { imgNumer } from "../defaultArtisQuizImg";
import { utilites } from "../Utilities";
import { Container } from "./Container";

export class ContainerImg extends Container {
  // element: HTMLDivElement;

  // cardsContainer: Container;

  cards: HTMLDivElement[];

  // images: HTMLImageElement[];

  // cardsDescription: Container;

  // cardsScore: Container;

  constructor(className: string, children: ChildElement[]) {
    super(className, children);

    this.cards = this.createCards();

    // this.cardsContainer = new Container("artistQuiz-main__cardsContainer");

    // this.element = this.cardsContainer.element;
    this.createImages();
  }

  private async createImages(amount = 11) {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < amount; i++) {
      const image = this.getImg(imgNumer[i]);
      images.push(await image);
    }
    return images;
  }

  private createCards(amount = 11) {
    const cards: HTMLDivElement[] = [];
    for (let i = 0; i < amount; i++) {
      const card = new Container("artistQuiz-main__card");
      cards.push(card.element);
    }
    return cards;
  }

  public async getImg(imgNumber: number) {
    const url = utilites.creatURLImg(imgNumber);
    const response = await fetch(url);
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imgUrl;
    return img;
  }
}

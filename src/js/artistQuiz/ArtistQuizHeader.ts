import { Container } from "../Container/Container";

export class ArtisQuizHeader {
  public element: HTMLDivElement;

  private header: Container;

  private wrapper: Container;

  private image: Container;

  constructor() {
    this.image = new Container("artistQuiz-header__logo");

    this.wrapper = new Container("artistQuiz-header__wrapper", [
      this.image.element
    ]);
    this.header = new Container("artistQuiz-header", [this.wrapper.element]);

    this.element = this.header.element;
  }
}

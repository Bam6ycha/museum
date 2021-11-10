import { Container } from "../Container";
import { Categories } from "./ArtistQuizCategories";
import { ArtisQuizFooter } from "./ArtistQuizFooter";
import { ArtisQuizHeader } from "./ArtistQuizHeader";
import { ArtisQuizMain } from "./ArtistQuizMain";

export class ArtisQuizPage {
  element: HTMLDivElement;

  container: Container;

  wrapper: Container;

  header: ArtisQuizHeader;

  categories: Categories;

  main: ArtisQuizMain;

  footer: ArtisQuizFooter;

  constructor() {
    this.header = new ArtisQuizHeader();

    this.categories = new Categories();

    this.main = new ArtisQuizMain();

    this.footer = new ArtisQuizFooter();

    this.wrapper = new Container("artistQuiz-page__wrapper", [
      this.header.element,
      this.categories.element,
      this.main.element,
      this.footer.element
    ]);

    this.container = new Container("artistQuiz-page", [this.wrapper.element]);

    this.element = this.container.element;
  }
}

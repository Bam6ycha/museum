import { Categories } from "../artistQuiz/ArtistQuizCategories";
import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { ArtisQuizHeader } from "../artistQuiz/ArtistQuizHeader";
import { Container } from "../Container/Container";
import { PictureQuizMain } from "./PictureQuizMain";

export class PictureQuiz {
  element: HTMLDivElement;

  container: Container;

  wrapper: Container;

  header: ArtisQuizHeader;

  categories: Categories;

  main: PictureQuizMain;

  footer: ArtisQuizFooter;

  constructor() {
    this.header = new ArtisQuizHeader();

    this.categories = new Categories();

    this.main = new PictureQuizMain("artistQuiz-main");

    this.footer = new ArtisQuizFooter();

    this.wrapper = new Container("artistQuiz-page__wrapper", [
      this.header.element,
      this.categories.element,
      this.main.element,
      this.footer.element
    ]);
    this.container = new Container("artistQuiz-page", [this.wrapper.element]);
    this.container.addClassName("hidden");
    this.element = this.container.element;
    this.hideArtisQuiz();
  }

  public addScore(score: number) {
    this.main.addScore(score);
  }

  public hideArtisQuiz() {
    this.categories.hideCardsAndArtisQuiz(() => {
      this.main.showCardsContainer();
      if (this.container.hasClass("show")) {
        setTimeout(() => this.hidePage(), 500);
      }
    });
  }

  hidePage() {
    this.container.addClassName("to-left");
    setTimeout(() => {
      this.container
        .addClassName("hidden")
        .removeClassName("show")
        .removeClassName("to-left");
    }, 500);
  }

  showPage() {
    if (this.container.hasClass("hidden")) {
      this.main.showCards();
      this.container.addClassName("from-left");
      this.container.addListener("animationend", () => {
        this.container
          .addClassName("show")
          .removeClassName("from-left")
          .removeClassName("hidden");
      });
    }
  }

  public showQuestionPage(listener: EventListener) {
    this.main.showQuestionPage(listener);
  }

  public cardsFooter() {
    return this.main.footerCards();
  }

  public onScoreClick(listener: EventListener) {
    this.main.onScoreClick(listener);
  }
}

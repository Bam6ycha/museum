import { Container } from "../Container/Container";
import { ContainerCards } from "../Container/ContainerCards";

export class ArtisQuizMain {
  public element: HTMLDivElement;

  private wrapper: Container;

  private cards: ContainerCards;

  constructor() {
    this.cards = new ContainerCards("artistQuiz-main__card");

    this.wrapper = new Container("artistQuiz-main", [this.cards.element]);

    this.element = this.wrapper.element;
  }

  public addScore(score: number) {
    this.cards.addTotalScore(score);
  }

  hideCards() {
    this.cards.addClassName("to-bottom");
    this.cards.addListener("animationend", () => {
      this.cards
        .addClassName("hiddenBottom")
        .removeClassName("to-bottom")
        .removeClassName("showFromBottom");
    });
  }

  showCards() {
    this.cards.addClassName("from-bottom");
    this.cards.addListener("animationend", () => {
      this.cards
        .addClassName("showFromBottom")
        .removeClassName("from-bottom")
        .removeClassName("hiddenBottom");
    });
  }

  showCardsContainer() {
    if (this.cards.hasClass("showFromBottom")) {
      this.hideCards();
    } else {
      this.showCards();
    }
  }

  public showQuestionPage(listener: EventListener) {
    this.cards.showQuestionPage(listener);
  }

  public footerCards() {
    return this.cards.cardFooter();
  }

  public onScoreClick(listener: EventListener) {
    this.cards.onScoreClick(listener);
  }
}

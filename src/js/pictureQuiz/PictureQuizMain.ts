import { Container } from "../Container/Container";
import { PictureQuizCards } from "./PictureQuizCards";

export class PictureQuizMain extends Container {
  private wrapper: Container;

  private cards: PictureQuizCards;

  constructor(className: string) {
    super(className);

    this.cards = new PictureQuizCards("artistQuiz-main__cardsContainer");

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

import { ButtonWithText } from "./buttons/ButtonWithText";
import { Container } from "./Container/Container";

export class FinalResults extends Container {
  private page: Container;

  private wrapper: Container;

  private header: Container;

  private headertextContainer: Container;

  private main: Container;

  private results: Container;

  private total: HTMLSpanElement;

  private maxScore: HTMLSpanElement;

  private imageContainer: Container;

  private footer: Container;

  private homeButton: ButtonWithText;

  private nextQuizButton: ButtonWithText;

  constructor(className: string) {
    super(className);

    this.nextQuizButton = new ButtonWithText(
      "settings-footer__cherryButton",
      "Next Quiz"
    );

    this.homeButton = new ButtonWithText(
      "categorie-artistQuiz__homeButton",
      "Home"
    );

    this.footer = new Container("final-resultsPage-footer", [
      this.homeButton.element,
      this.nextQuizButton.element
    ]);

    this.imageContainer = new Container("final-resultsPage-main__image");

    this.maxScore = document.createElement("span");
    this.maxScore.classList.add("final-resultsPage-main__results_GreyBig");
    this.maxScore.textContent = `${"/10"}`;
    this.total = document.createElement("span");
    this.total.classList.add("final-resultsPage-main__results_GreyBig");

    this.results = new Container("final-resultsPage-main__results", [
      this.total,
      this.maxScore
    ]);

    this.main = new Container("final-resultsPage-main", [
      this.results.element,
      this.imageContainer.element
    ]);

    this.headertextContainer = new Container(
      "final-resultsPage-header__textContainer"
    );
    this.headertextContainer.addClassName(
      "final-resultsPage-header__textContainer_cappitalizeGrey"
    );

    this.headertextContainer.setText("CONGRATULATIONS !");

    this.header = new Container("final-resultsPage-header", [
      this.headertextContainer.element
    ]);

    this.wrapper = new Container("final-resultsPage__wrapper", [
      this.header.element,
      this.main.element,
      this.footer.element
    ]);

    this.page = new Container("final-resultsPage", [this.wrapper.element]);
    this.element = this.page.element;
    this.page.addClassName("hidden");
    this.homeButton.OnClick(() => this.hideFinalResult());
    this.nextQuizButton.OnClick(() => this.hideFinalResult());
  }

  public showFinalResult() {
    if (this.page.hasClass("hidden")) {
      this.page.addClassName("from-right");
      setTimeout(() => {
        this.page
          .addClassName("show")
          .removeClassName("from-right")
          .removeClassName("hidden");
      }, 500);
    }
  }

  private hideFinalResult() {
    if (this.page.hasClass("show")) {
      this.page.addClassName("to-left");
    }
    setTimeout(() => {
      this.page
        .addClassName("hidden")
        .removeClassName("to-left")
        .removeClassName("show");
    });
  }

  public setTotal(value: string) {
    this.total.textContent = value;
  }

  public hideQuestionPageShowHomePage(listener: EventListener) {
    this.homeButton.OnClick(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.nextQuizButton.OnClick(listener);
  }
}

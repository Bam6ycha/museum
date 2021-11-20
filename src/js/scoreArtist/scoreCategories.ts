import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";

export class ScoreCategories extends Container {
  public element: HTMLDivElement;

  private homeButton: ButtonWithText;

  private categoriesButton: ButtonWithText;

  private description: Container;

  private wrapper: Container;

  constructor(className: string) {
    super(className);

    this.categoriesButton = new ButtonWithText(
      "artistQuizQuestions-header__categoriseButton",
      "Categories"
    );

    this.homeButton = new ButtonWithText(
      "categorie-artistQuiz__homeButton",
      "Home"
    );

    this.description = new Container(
      "categorie-artistQuiz__description"
    ).setText("Score");

    this.wrapper = new Container("categorie-artistQuiz__wrapper", [
      this.homeButton.element,
      this.description.element,
      this.categoriesButton.element
    ]);

    this.element = this.wrapper.element;
    if (document.documentElement.clientWidth <= 376) {
      this.homeButton.addTextToButton("");
      this.categoriesButton.addTextToButton("");
    }
  }

  hideShowCategories(listener: EventListener) {
    this.categoriesButton.OnClick(listener);
  }

  hideShowHome(listener: EventListener) {
    this.homeButton.OnClick(listener);
  }
}

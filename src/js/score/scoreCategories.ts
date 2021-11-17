import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";

export class ScoreCategories extends Container {
  public element: HTMLDivElement;

  private homeButton: ButtonWithText;

  private description: Container;

  private wrapper: Container;

  constructor(className: string) {
    super(className);

    this.homeButton = new ButtonWithText(
      "categorie-artistQuiz__homeButton",
      "Home"
    );

    this.description = new Container(
      "categorie-artistQuiz__description"
    ).setText("Score");

    this.wrapper = new Container("categorie-artistQuiz__wrapper", [
      this.homeButton.element,
      this.description.element
    ]);

    this.element = this.wrapper.element;
  }

  hideCardsAndArtisQuiz(listener: EventListener) {
    this.homeButton.OnClick(listener);
  }
}

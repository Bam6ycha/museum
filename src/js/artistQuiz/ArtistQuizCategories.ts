import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";

export class Categories {
  public element: HTMLDivElement;

  private homeButton: ButtonWithText;

  private description: Container;

  private wrapper: Container;

  constructor() {
    this.homeButton = new ButtonWithText(
      "categorie-artistQuiz__homeButton",
      "Home"
    );

    this.description = new Container(
      "categorie-artistQuiz__description"
    ).setText("Categories");

    this.wrapper = new Container("categorie-artistQuiz__wrapper", [
      this.homeButton.element,
      this.description.element
    ]);

    this.element = this.wrapper.element;
    if (document.documentElement.clientWidth <= 376) {
      this.homeButton.addTextToButton("");
    }
  }

  hideCardsAndArtisQuiz(listener: EventListener) {
    this.homeButton.OnClick(listener);
  }
}

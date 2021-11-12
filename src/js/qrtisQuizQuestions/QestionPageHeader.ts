import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";

export class QuestionsPageHeader {
  public element: HTMLDivElement;

  private homeButton: ButtonWithText;

  private question: Container;

  private wrapper: Container;

  private categoriesButton: ButtonWithText;

  private timerContainer: Container;

  constructor() {
    this.homeButton = new ButtonWithText(
      "categorie-artistQuiz__homeButton",
      "Home"
    );

    this.question = new Container("artistQuizQuestions-header__question");

    this.question.setText("Кто автор данной картины?");

    this.timerContainer = new Container("artistQuizQuestions-header__timer");
    this.timerContainer.setOpacity(
      localStorage.getItem("timerStempsOpacity") ?? "0"
    );
    this.timerContainer.setText(
      `${"00:"}${localStorage.getItem("timerCount") ?? "30"}`
    );

    this.categoriesButton = new ButtonWithText(
      "artistQuizQuestions-header__categoriseButton",
      "Categories"
    );

    this.wrapper = new Container("artistQuizQuestions-header__wrapper", [
      this.homeButton.element,
      this.question.element,
      this.timerContainer.element,
      this.categoriesButton.element
    ]);

    this.element = this.wrapper.element;
  }

  public decreasingTimer() {
    if (this.timerContainer.element.textContent) {
      const value: string = this.timerContainer.element.textContent;

      let seconds = +value.slice(3);

      seconds -= 1;
      this.timerContainer.element.textContent = `${"00:"}${seconds}`;
      if (seconds < 10) {
        this.timerContainer.element.textContent = `${"00:"}${"0"}${seconds}`;
      }
    }
  }
}

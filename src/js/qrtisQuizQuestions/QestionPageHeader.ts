import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";
import { OpacityValues } from "../enums";

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
    this.timerContainer.setOpacity(OpacityValues.Invisible);
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
    if (document.documentElement.clientWidth <= 376) {
      this.homeButton.addTextToButton("");
      this.categoriesButton.addTextToButton("");
    }
  }

  getSeconds() {
    const totalTime = this.timerContainer.element.textContent ?? "0";

    const seconds = +totalTime.slice(3);

    return seconds;
  }

  public decreasingTimer() {
    let seconds = this.getSeconds();

    seconds -= 1;
    this.timerContainer.element.textContent = `${"00:"}${seconds}`;
    if (seconds < 10) {
      this.timerContainer.element.textContent = `${"00:"}${"0"}${seconds}`;
    }
    return seconds;
  }

  public isTimerGame() {
    const timerState = +(localStorage.getItem("timerStempsOpacity") ?? "0");
    if (timerState) {
      return true;
    }
    return false;
  }

  public timerGame(action?: CallableFunction) {
    if (this.isTimerGame()) {
      this.timerContainer.setText(
        `${"00:"}${localStorage.getItem("timerCount") ?? "30"}`
      );
      this.timerContainer.setOpacity(OpacityValues.Visible);
      const timer = setInterval(() => {
        this.decreasingTimer();
        if (this.getSeconds() === 0 && action) {
          clearInterval(timer);
          action();
        }
      }, 1000);
    }
  }

  public showHomePage(listener: EventListener) {
    this.homeButton.OnClick(listener);
  }

  public showCategoriesPage(listener: EventListener) {
    this.categoriesButton.OnClick(listener);
  }
}

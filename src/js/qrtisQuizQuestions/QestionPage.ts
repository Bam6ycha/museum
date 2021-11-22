import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { Container } from "../Container/Container";
import { QuestionsPageHeader } from "./QestionPageHeader";
import { QuestionsPageMain } from "./QuestionPageMain";

export class QusetionPage {
  public element: HTMLDivElement;

  private container: Container;

  private wrapper: Container;

  private header: QuestionsPageHeader;

  private main: QuestionsPageMain;

  private footer: ArtisQuizFooter;

  constructor() {
    this.header = new QuestionsPageHeader();

    this.main = new QuestionsPageMain();

    this.footer = new ArtisQuizFooter();

    this.wrapper = new Container("artistQuizQuestions-wrapper", [
      this.header.element,
      this.main.element,
      this.footer.element
    ]);

    this.container = new Container("artistQuizQuestions-container", [
      this.wrapper.element
    ]);
    this.container.addClassName("hidden");
    this.element = this.container.element;
    this.showHomePage(() => this.hideQuestionPage());
    this.resetTimer(() => {
      this.header.timerGame(() => {
        this.main.showWrongAnswer();
      });
    });
  }

  public getScore() {
    return this.main.getScore();
  }

  public showHomePage(listener: EventListener) {
    this.header.showHomePage(listener);
  }

  public hideQuestionPage() {
    if (this.container.hasClass("show")) {
      this.container.addClassName("to-left");
      this.container.addListener("animationend", () => {
        this.container.removeClassName("to-left");
        this.container.removeClassName("show");
        this.container.addClassName("hidden");
      });
    }
  }

  private startNewTimer(action: CallableFunction) {
    this.main.showResult(action);
  }

  public async showQuestionPage() {
    if (this.container.hasClass("hidden")) {
      this.container.addClassName("from-right");
      this.container.addListener("animationend", () => {
        this.container
          .removeClassName("hidden")
          .removeClassName("from-right")
          .addClassName("show");
      });
    }
  }

  public showCategoriesPage(listener: EventListener) {
    this.header.showCategoriesPage(listener);
  }

  public async startQuiz(number: number) {
    await this.main.startQuiz(number);
    const animationendTime = 1000;
    setTimeout(
      () => this.header.timerGame(() => this.main.showWrongAnswer()),
      animationendTime
    );
  }

  private resetTimer(listener: EventListener) {
    this.main.resetTimer(listener);
  }

  public hideQuestionPageShowHome(listener: EventListener) {
    this.main.hideQuestionPageShowHomePage(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.main.hideQuestionPageShowCategories(listener);
  }
}

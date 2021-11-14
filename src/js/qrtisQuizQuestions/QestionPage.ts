import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { Container } from "../Container/Container";
import { QuestionsPageHeader } from "./QestionPageHeader";
// import { QuestionsPageFooter } from "./QestionPageFooter";
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
  }

  public showHomePage(listener: EventListener) {
    this.header.showHomePage(listener);
  }

  public hideQuestionPage() {
    if (this.container.hasClass("show")) {
      this.container.addClassName("to-left");
      this.container.addListener("animationend", () => {
        this.container
          .removeClassName("show")
          .removeClassName("to-left")
          .addClassName("hidden");
      });
    }
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
}

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

    this.element = this.container.element;
    this.onNextButtonClick(() => {
      this.hideMainPage();
    });
  }

  onNextButtonClick(listener: EventListener) {
    this.main.removeMainPage(listener);
  }

  hideMainPage() {
    this.main.element.classList.add("to-left");
    setTimeout(() => {
      this.removeMainPage();
      this.addMainPage();
    }, 1000);
  }

  removeMainPage() {
    this.main.element.remove();
  }

  addMainPage() {
    this.main = new QuestionsPageMain();
    this.wrapper.append(this.main.element);
    this.main.element.classList.add("hidden");
    this.main.element.classList.add("from-left");
    setTimeout(() => {
      this.main.element.classList.remove("hidden", "from-left");
      this.main.element.classList.add("show");
    }, 1000);
  }
}

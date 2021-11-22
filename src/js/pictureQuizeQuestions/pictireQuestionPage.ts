import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { Container } from "../Container/Container";
import { PictureQustionPageMain } from "./pictureQestionPageMain";
import { QueistionPicturePageHeader } from "./pictureQuestionPageHeader";

export class PictureQuizPage {
  public element: HTMLDivElement;

  private container: Container;

  private header: QueistionPicturePageHeader;

  private wrapper: Container;

  private main: PictureQustionPageMain;

  private footer: ArtisQuizFooter;

  constructor() {
    this.header = new QueistionPicturePageHeader();

    this.main = new PictureQustionPageMain();

    this.footer = new ArtisQuizFooter();

    this.wrapper = new Container("pictureQuizQuestions-wrapper", [
      this.header.element,
      this.main.element,
      this.footer.element
    ]);

    this.container = new Container("pictureQuizQuestions-container", [
      this.wrapper.element
    ]);
    this.container.addClassName("hidden");
    this.element = this.container.element;

    this.changeAuthor(() => this.addAuthor());
    this.resetTimer(() => {
      this.header.timerGame(() => {
        this.main.showWrongAnswer();
      });
    });
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

  public async startQuiz() {
    await this.main.strartQuiz();
    await this.addAuthor();
    const animationendTime = 1000;
    setTimeout(
      () => this.header.timerGame(() => this.main.showWrongAnswer()),
      animationendTime
    );
  }

  private resetTimer(listener: EventListener) {
    this.main.resetTimer(listener);
  }

  public showCategoriesPage(listener: EventListener) {
    this.header.showCategoriesPage(listener);
  }

  private changeAuthor(listener: EventListener) {
    this.main.changeAuthor(listener);
  }

  private async addAuthor() {
    const order = this.main.getMin();

    await this.header.getAuthor(order);
  }

  public hideQuestionPageShowHome(listener: EventListener) {
    this.main.hideQuestionPageShowHomePage(listener);
  }

  public hideQuestionPageShowCategories(listener: EventListener) {
    this.main.hideQuestionPageShowCategories(listener);
  }

  public getScore() {
    return this.main.getScore();
  }
}

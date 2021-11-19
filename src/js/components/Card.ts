import { Container } from "../Container/Container";
import { utilites } from "../Utilities";

export class Card extends Container {
  private container: Container;

  private header: Container;

  private headlink: HTMLHeadingElement;

  private totalScoreContainer: Container;

  private footer: Container;

  constructor(className: string) {
    super(className);

    this.headlink = document.createElement("h2");

    this.totalScoreContainer = new Container("artistQuiz-main__totalScore");

    this.header = new Container("artistQuiz__card_description", [
      this.headlink,
      this.totalScoreContainer.element
    ]);

    this.footer = new Container("artistQuiz-main__score");

    this.container = new Container("artistQuiz-main__card", [
      this.header.element,
      this.footer.element
    ]);

    this.element = this.container.element;

    this.addFooterText();
  }

  public addHeaderText(text: string) {
    this.headlink.textContent = text;
  }

  public getimg() {
    return this.container.element.children[2];
  }

  public addScore(score: string) {
    this.totalScoreContainer.setText(score);
    return this;
  }

  public async addImage(order: number) {
    const image = await utilites.getImg(order);
    this.container.append(image);
    return this;
  }

  public addFooterText(string = "SCORE") {
    this.footer.setText(string);
    return this;
  }

  onScoreClick(listener: EventListener) {
    this.footer.addListener("click", listener);
  }

  getFooter() {
    return this.footer.element;
  }
}

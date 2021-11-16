import { ButtonWithText } from "../buttons/ButtonWithText";
import { ChildElement } from "../childElementType";
import { Container } from "../Container/Container";

export class PictureDescription extends Container {
  public element: HTMLDivElement;

  private page: Container;

  private wrapper: Container;

  private header: Container;

  private image: Container;

  private main: Container;

  private pictureDescriptionImgContainer: Container;

  private pictureDescriptionContainer: Container;

  private footer: Container;

  private nextButton: ButtonWithText;

  private answerContainers: HTMLDivElement[];

  constructor(className: string, children?: ChildElement[]) {
    super(className, children);

    this.nextButton = new ButtonWithText(
      "settings-footer__cherryButton",
      "Next"
    );

    this.answerContainers = this.createChildElements();

    this.footer = new Container("pictureDescriptionPage-footer", [
      this.nextButton.element
    ]);

    this.pictureDescriptionImgContainer = new Container(
      "pictureDescriptionPage-main__descriptionContainer"
    );

    this.pictureDescriptionContainer = new Container(
      "pictureDescriptionPage-main__text",
      [...this.answerContainers]
    );

    this.main = new Container("pictureDescriptionPage-main", [
      this.pictureDescriptionImgContainer.element,
      this.pictureDescriptionContainer.element
    ]);

    this.image = new Container("pictureDescriptionPage-header__image");

    this.header = new Container("pictureDescriptionPage-header", [
      this.image.element
    ]);

    this.wrapper = new Container("pictureDescriptionPage-wrapper", [
      this.header.element,
      this.main.element,
      this.footer.element
    ]);

    this.page = new Container("pictureDescriptionPage", [this.wrapper.element]);

    this.element = this.page.element;
    this.hideResult();
  }

  public addDescription(descriprion: string[]) {
    this.answerContainers.forEach((element, index) => {
      element.textContent = descriprion[index];
    });
  }

  private createChildElements() {
    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < 3; i++) {
      const element = new Container("pictureDescriptionPage-main__description");
      elements.push(element.element);
    }
    return elements;
  }

  public setImg(img: HTMLImageElement) {
    this.pictureDescriptionImgContainer.append(img);
    return this;
  }

  public setHeaderImg(value: string) {
    this.image.addClassName(value);
    return this;
  }

  public showResult(className: string) {
    this.setHeaderImg(className);
    this.page.addClassName("from-right");
    this.page.addListener("animationend", () => {
      this.page
        .removeClassName("hidden")
        .removeClassName("from-right")
        .addClassName("show");
    });
  }

  public hideResult() {
    this.nextButton.OnClick(() => {
      this.page.addClassName("to-left");
      this.page.addListener("animationend", () => {
        this.page
          .removeClassName("show")
          .removeClassName("to-left")
          .addClassName("hidden");
      });
      setTimeout(() => {
        this.image.removeClassName("correct").removeClassName("wrong");
      }, 1000);
    });
  }

  public removeImage() {
    const image = this.pictureDescriptionImgContainer.element.children;
    if (image.length > 1) {
      image[0].remove();
    }
  }

  public nextQuestion(listener: EventListener) {
    this.nextButton.OnClick(listener);
  }
}

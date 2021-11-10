import { cardsTitle } from "./cartdsTitle/cardsTitle";
import { ChildElement } from "./childElementType";

const imgNumer = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
class Container {
  public element: HTMLDivElement;

  constructor(className: string, children?: ChildElement[]) {
    this.element = this.createDivElement();

    this.addClassName(className);
    if (children) {
      children.forEach((child) => this.append(child));
    }
  }

  public addListeners(
    event: string,
    callback: EventListenerOrEventListenerObject
  ) {
    this.element.addEventListener(event, callback);
    return this;
  }

  public addClassName(className: string) {
    this.element.classList.add(className);
    return this;
  }

  public append(childElement: ChildElement) {
    this.element.append(childElement);
    return this;
  }

  public after(childElement: ChildElement) {
    this.element.after(childElement);
    return this;
  }

  public before(childElement: ChildElement) {
    this.element.before(childElement);
    return this;
  }

  private createDivElement() {
    return document.createElement("div");
  }

  public async createSomeElementsWithImg(amount: number, className: string) {
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < amount - 1; i++) {
      const element = this.createDivElement();
      const img = await this.getImg(imgNumer[i]);
      element.classList.add(className);
      const description = document.createElement("div");
      description.classList.add("artistQuiz__card_description");
      description.textContent = cardsTitle[i];
      element.append(description);
      element.append(img);
      elements.push(element);
    }
    return elements;
  }

  public cleateSomeElements(amount: number) {
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < amount - 1; i++) {
      const element = this.createDivElement();
      element.classList.add();
      elements.push(element);
    }
    return elements;
  }

  public hasClass(className: string) {
    return this.element.classList.contains(className);
  }

  public removeClassName(className: string) {
    this.element.classList.remove(className);
    return this;
  }

  public setBackgroundImg(src: string) {
    this.element.style.backgroundImage = `url(${src})`;
    return this;
  }

  public async getImg(imgNumber: number) {
    const url = this.creatURL(imgNumber);
    const response = await fetch(url);
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imgUrl;
    return img;
  }

  public getRandomNumber(min: number, max: number) {
    const random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
  }

  public creatURL(imgNumber: number) {
    const imgURL = `https://raw.githubusercontent.com/Bam6ycha/image-data/master/img/${imgNumber}.jpg`;
    return imgURL;
  }

  setText(text: string) {
    this.element.textContent = text;
    return this;
  }

  public setOpacity(value: string) {
    this.element.style.opacity = value;
  }

  public setVisibility(value: string) {
    this.element.style.visibility = value;
  }

  public prepend(childElement: ChildElement) {
    this.element.prepend(childElement);
    return this;
  }

  public removeListeners(
    event: string,
    callback: EventListenerOrEventListenerObject
  ) {
    this.element.removeEventListener(event, callback);
    return this;
  }

  public returnDefaults() {
    this.setOpacity("0");
    this.setVisibility("hidden");
  }
}

export { Container };

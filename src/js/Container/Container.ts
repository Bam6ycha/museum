import { ChildElement } from "../childElementType";

class Container {
  public element: HTMLDivElement;

  constructor(className: string, children?: ChildElement[]) {
    this.element = this.createDivElement();

    this.addClassName(className);
    if (children) {
      children.forEach((child) => this.append(child));
    }
  }

  public addListener(
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

  public getOpacity() {
    return this.element.style.opacity;
  }

  protected createDivElement() {
    return document.createElement("div");
  }

  public hasClass(className: string) {
    return this.element.classList.contains(className);
  }

  public removeClassName(className: string) {
    this.element.classList.remove(className);
    return this;
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

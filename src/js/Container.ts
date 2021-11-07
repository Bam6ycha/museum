import { ChildElement } from "./childElementType";

class Container {
  public element: HTMLDivElement;

  constructor(className: string, children?: ChildElement[]) {
    this.element = this.createDivElement();

    this.addClassName(className);
    if (children) {
      children.forEach((child) => this.append(child));
    }
  }

  createDivElement() {
    return document.createElement("div");
  }

  addClassName(className: string) {
    this.element.classList.add(className);
    return this;
  }

  removeClassName(className: string) {
    this.element.classList.remove(className);
    return this;
  }

  setBackgroundImg(src: string) {
    this.element.style.backgroundImage = `url(${src})`;
    return this;
  }

  setText(text: string) {
    this.element.textContent = text;
    return this;
  }

  append(childElement: ChildElement) {
    this.element.append(childElement);
    return this;
  }

  prepend(childElement: ChildElement) {
    this.element.prepend(childElement);
    return this;
  }

  after(childElement: ChildElement) {
    this.element.after(childElement);
    return this;
  }

  before(childElement: ChildElement) {
    this.element.before(childElement);
    return this;
  }

  hasClass(className: string) {
    return this.element.classList.contains(className);
  }

  addListeners(event: string, callback: EventListenerOrEventListenerObject) {
    this.element.addEventListener(event, callback);
    return this;
  }

  removeListeners(event: string, callback: EventListenerOrEventListenerObject) {
    this.element.removeEventListener(event, callback);
    return this;
  }
}

export { Container };

import { ChildElement } from "./childElement_Type";

class Container {
  element: HTMLDivElement;

  constructor(className: string) {
    this.element = this.createContainerElement();

    this.addClassName(className);
  }

  createContainerElement() {
    return document.createElement("div");
  }

  addClassName(className: string) {
    this.element.classList.add(className);

    return className;
  }

  setBackgroundImg(src: string) {
    this.element.style.backgroundImage = `url(${src})`;
  }

  setText(text: string) {
    this.element.textContent = text;
  }

  append(childElement: ChildElement) {
    this.element.append(childElement);
  }

  prepend(childElement: ChildElement) {
    this.element.prepend(childElement);
  }

  after(childElement: ChildElement) {
    this.element.after(childElement);
  }

  before(childElement: ChildElement) {
    this.element.before(childElement);
  }
}

export { Container };

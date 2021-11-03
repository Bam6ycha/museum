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
}

export { Container };

export class Button {
  public element: HTMLButtonElement;

  constructor(buttonClassName: string) {
    this.element = this.createButtonElement();
    this.addClassToButtonElement(buttonClassName);
  }

  createButtonElement() {
    return document.createElement("button");
  }

  addClassToButtonElement(className: string) {
    this.element.classList.add(`${className}`);
    return this;
  }

  removeClassFromButtonElement(className: string) {
    this.element.classList.remove(className);
    return this;
  }

  OnClick(listener: EventListener) {
    this.element.addEventListener("click", listener);
  }

  isContainsClass(className: string) {
    return this.element.classList.contains(className);
  }
}

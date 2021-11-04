export class Button {
  element: HTMLButtonElement;

  constructor(buttonClassName: string) {
    this.element = this.createButtonElement();
    this.addClassToButtonElement(buttonClassName);
  }

  createButtonElement() {
    return document.createElement("button");
  }

  addClassToButtonElement(className: string) {
    this.element.classList.add(`${className}`);
  }

  OnClick(callBack: EventListenerOrEventListenerObject) {
    this.element.addEventListener("click", callBack);
  }
}

export class Input {
  element: HTMLInputElement;

  constructor(inputType: string, value = "") {
    this.element = this.createInputElement();
    this.element.value = value;

    this.setAttribute("type", inputType);
  }

  createInputElement() {
    return document.createElement("input");
  }

  addClassName(className: string) {
    this.element.classList.add(className);
    return this;
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
    return this;
  }

  addListener(event: string, listener: EventListener) {
    this.element.addEventListener(event, listener);
    return this;
  }

  removeListener(event: string, listener: EventListener) {
    this.element.removeEventListener(event, listener);
    return this;
  }
}

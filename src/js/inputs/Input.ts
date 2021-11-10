export class Input {
  public element: HTMLInputElement;

  constructor(inputType: string, value = "") {
    this.element = this.createInputElement();
    this.element.value = value;

    this.setAttribute("type", inputType);
  }

  public addClassName(className: string) {
    this.element.classList.add(className);
    return this;
  }

  public addListener(event: string, listener: EventListener) {
    this.element.addEventListener(event, listener);
    return this;
  }

  public createInputElement() {
    return document.createElement("input");
  }

  public setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
    return this;
  }

  public removeListener(event: string, listener: EventListener) {
    this.element.removeEventListener(event, listener);
    return this;
  }
}

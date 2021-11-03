export class Input {
  element: HTMLInputElement;
  constructor(
    min: string = "",
    max: string = "",
    value: string = "",
    step: string = "",
    name: string,
    inputType: string
  ) {
    this.element = this.createInputElement();
    this.element.value = value;
    this.element.setAttribute("max", max);
    this.element.setAttribute("min", min);
    this.element.setAttribute("step", step);
    this.determinateTypeOFInput(name, inputType);
  }
  createInputElement() {
    return document.createElement("input");
  }
  get min() {
    return this.element.min;
  }
  get max() {
    return this.element.max;
  }
  get value() {
    return this.element.value;
  }
  get step() {
    return this.element.step;
  }

  set value(number: string) {
    let value = this.element.value;
    value = number;
  }
  determinateTypeOFInput(name: string, value: string) {
    this.element.setAttribute(name, value);
  }
}

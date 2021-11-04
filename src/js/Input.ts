class Input {
  element: HTMLInputElement;

  constructor(
    min: string,
    max: string,
    value: string,
    step: string,
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

  addClass(className: string) {
    this.element.classList.add(className);
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

  determinateTypeOFInput(name: string, value: string) {
    this.element.setAttribute(name, value);
  }

  eventActions(event: string, cb: EventListenerOrEventListenerObject) {
    this.element.addEventListener(event, cb);
  }

  removeListener(event: string, cb: EventListenerOrEventListenerObject) {
    this.element.removeEventListener(event, cb);
  }

  isChecked() {
    return this.element.checked;
  }

  toggleChecked() {
    if (this.isChecked()) {
      this.element.checked = false;
    } else {
      this.element.checked = true;
    }
  }
}

const checkbox = new Input("", "", "", "", "type", "checkbox");

const settingSoundBar = new Input("0", "100", "30", "0.1", "type", "range");

const timerSteps = new Input("5", "30", "30", "5", "type", "number");

export { checkbox, settingSoundBar, timerSteps, Input };

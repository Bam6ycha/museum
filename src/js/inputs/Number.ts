import { Input } from "./Input";
import { NumberOrRangeInputParameters } from "./types";

export class NumberInput extends Input {
  constructor({ max, min, value, step }: NumberOrRangeInputParameters) {
    super("number", "30");

    this.setAttribute("max", max)
      .setAttribute("min", min)
      .setAttribute("value", value)
      .setAttribute("step", step);
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
}

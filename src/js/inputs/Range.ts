import { Input } from "./Input";
import { NumberOrRangeInputParameters } from "./types";

export class RangeInput extends Input {
  constructor({ max, min, step }: NumberOrRangeInputParameters) {
    super("range", "0.3");

    this.setAttribute("max", max)
      .setAttribute("min", min)

      .setAttribute("step", step);
  }

  get max() {
    return this.element.max;
  }

  get min() {
    return this.element.min;
  }

  get value() {
    return this.element.value;
  }

  get step() {
    return this.element.step;
  }

  onChange(listener: EventListener) {
    this.element.addEventListener("change", listener);
  }

  onThumbDrag(listener: EventListener) {
    this.element.addEventListener("mousedown", listener);
  }
}

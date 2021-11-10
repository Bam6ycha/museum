import { Input } from "./Input";
import { NumberOrRangeInputParameters } from "./types";

export class NumberInput extends Input {
  constructor({ max, min, value, step }: NumberOrRangeInputParameters) {
    super("number", "30");
    this.validateInputAndSetTimer();
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

  public returnDefaults() {
    this.setValue("30");
  }

  public setValue(value: string) {
    this.element.value = value;
  }

  private validateInputAndSetTimer() {
    this.addListener("blur", () => {
      const value = +this.element.value;

      if (value <= 30 && value >= 5) {
        const remainder = value % 5;
        let roundedValue: string;
        if (remainder !== 0) {
          roundedValue = `${value + 5 - remainder}`;
        } else {
          roundedValue = `${value}`;
        }
        this.setValue(roundedValue);
        localStorage.setItem("timerCount", roundedValue);
        return this;
      }

      if (value > 30) {
        this.setValue("30");
        localStorage.setItem("timerCount", "30");
        return this;
      }

      if (value < 5) {
        this.element.value = "5";
        localStorage.setItem("timerCount", "5");
        return this;
      }

      return this;
    });
  }
}

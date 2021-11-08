import { Button } from "../buttons/Button";
import { Container } from "../Container";
import { Checkbox } from "../inputs/CheckBox";
import { NumberInput } from "../inputs/Number";

import { NumberOrRangeInputParameters } from "../inputs/types";

const settingInputData: NumberOrRangeInputParameters = {
  min: "5",

  max: "30",

  value: "30",

  step: "5"
};
export class Timer {
  element: HTMLDivElement;

  private container: Container;

  private timerButtonContainer: Container;

  private timerStepsContainer: Container;

  private checkboxContainer: Container;

  private checkboxDescription: Container;

  private timerSteps: NumberInput;

  private checkbox: Checkbox;

  private timerButton: Button;

  constructor() {
    this.checkbox = new Checkbox();

    this.checkbox.element.style.visibility = "hidden";
    this.timerSteps = new NumberInput(settingInputData);

    this.timerSteps.addClassName("settigs-main__amount");

    this.timerButton = new Button("settings-clock");

    this.timerButtonContainer = new Container("settings-main__ClockContainer", [
      this.timerButton.element
    ]);

    this.timerStepsContainer = new Container(
      "settings-main__timerAmountContainer",
      [this.timerSteps.element]
    );

    this.timerStepsContainer.element.style.opacity = "0";

    this.checkboxContainer = new Container("settings-main__checkboxContainer", [
      this.checkbox.element
    ]);

    this.checkboxDescription = new Container(
      "settings-main__checkBoxDescription"
    )
      .addClassName("settings-main__checkBoxDescription_cherrySmall")
      .setText("ON/OFF");

    this.container = new Container("setting-main__timer", [
      this.timerButtonContainer.element,
      this.timerStepsContainer.element,
      this.checkboxContainer.element,
      this.checkboxDescription.element
    ]);

    this.element = this.container.element;
  }

  onChange(callback: EventListenerOrEventListenerObject) {
    this.timerSteps.element.addEventListener("change", callback);
    return this;
  }

  onDomLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      this.timerStepsContainer.element.style.opacity =
        localStorage.getItem("timerStempsVisibility") ?? "0";
      this.timerSteps.element.value =
        localStorage.getItem("timerCount") ?? "30";
    });
  }

  toogleCheckBoxOnButton() {
    this.timerButton.OnClick(() => {
      this.checkbox.toggle();
      if (this.timerStepsContainer.element.style.opacity === "0") {
        localStorage.setItem(
          "timerStempsVisibility",
          (this.timerStepsContainer.element.style.opacity = "1")
        );
        this.showTimerStemps();
      } else {
        this.hideTimerStemps();
        localStorage.setItem(
          "timerStempsVisibility",
          (this.timerStepsContainer.element.style.opacity = "0")
        );
      }
    });
  }

  showTimerStemps() {
    this.timerStepsContainer.element.style.visibility = "";
    this.timerStepsContainer.addClassName("visible");
    setTimeout(() => {
      this.timerStepsContainer.removeClassName("visible");
      this.timerStepsContainer.element.style.opacity = "1";
    }, 500);
  }

  hideTimerStemps() {
    this.timerStepsContainer.removeClassName("visible");
    this.timerStepsContainer.addClassName("invisible");
    setTimeout(() => {
      this.timerStepsContainer.removeClassName("invisible");
      this.timerStepsContainer.element.style.visibility = "hidden";
      this.timerStepsContainer.element.style.opacity = "0";
    }, 500);
  }

  validateInputAndSetTimer() {
    this.timerSteps.addListener("blur", () => {
      const value = +this.timerSteps.value;

      if (value <= 30 && value >= 5 && value % 5 === 0) {
        localStorage.setItem("timerCount", `${value}`);
        return this;
      }

      if (value % 5 !== 0) {
        for (let i = value; i <= 30; i++) {
          if (i % 5 === 0) {
            this.timerSteps.element.value = `${i}`;
            localStorage.setItem("timerCount", `${i}`);
            return this;
          }
        }
      }

      if (value > 30) {
        this.timerSteps.element.value = "30";
        return this;
      }

      if (value < 5) {
        this.timerSteps.element.value = "5";
        return this;
      }
      return this;
    });
  }
}

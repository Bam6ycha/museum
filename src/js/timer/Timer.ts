import { Button } from "../buttons/Button";
import { Container } from "../Container";
import { Checkbox } from "../inputs/CheckBox";
import { NumberInput } from "../inputs/Number";

import { NumberOrRangeInputParameters } from "../inputs/types";

const settingInputData: NumberOrRangeInputParameters = {
  min: "5",

  max: "30",

  value: "30",

  step: "5 "
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

    this.timerSteps = new NumberInput(settingInputData);

    this.timerButton = new Button("settings-clock");

    this.timerButton = new Button("settings-clock");

    this.timerButtonContainer = new Container("settings-main__ClockContainer", [
      this.timerButton.element
    ]);

    this.timerStepsContainer = new Container(
      "settings-main__timerAmountContainer",
      [this.timerSteps.element]
    )
      .addClassName("invisible")
      .addClassName("settigs-main__amount");

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
}

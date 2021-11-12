import { Button } from "../buttons/Button";
import { Container } from "../Container/Container";
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

  private timerStepsInput: NumberInput;

  private checkbox: Checkbox;

  private timerButton: Button;

  constructor() {
    this.checkbox = new Checkbox();

    this.checkbox.element.style.visibility = "hidden";

    this.timerStepsInput = new NumberInput(settingInputData);

    this.timerStepsInput.addClassName("settigs-main__amount");

    this.timerButton = new Button("settings-clock");

    this.timerButtonContainer = new Container("settings-main__ClockContainer", [
      this.timerButton.element
    ]);

    this.timerStepsContainer = new Container(
      "settings-main__timerAmountContainer",
      [this.timerStepsInput.element]
    );

    this.timerStepsContainer.setOpacity("0");

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

    this.toogleCheckBoxOnButton();
    this.onDomLoad();
  }

  onChange(callback: EventListenerOrEventListenerObject) {
    this.timerStepsInput.element.addEventListener("change", callback);
    return this;
  }

  onDomLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      this.timerStepsContainer.element.style.opacity =
        localStorage.getItem("timerStempsOpacity") ?? "0";
      this.timerStepsInput.element.value =
        localStorage.getItem("timerCount") ?? "30";
    });
  }

  toogleCheckBoxOnButton() {
    this.timerButton.OnClick(() => {
      this.checkbox.toggle();
      if (this.timerStepsContainer.element.style.opacity === "0") {
        localStorage.setItem(
          "timerStempsOpacity",
          (this.timerStepsContainer.element.style.opacity = "1")
        );
        this.showTimerStemps();
      } else {
        this.hideTimerStemps();
        localStorage.setItem(
          "timerStempsOpacity",
          (this.timerStepsContainer.element.style.opacity = "0")
        );
      }
    });
  }

  private showTimerStemps() {
    this.timerStepsContainer.setVisibility("");
    this.timerStepsContainer.addClassName("visible");
    setTimeout(() => {
      this.timerStepsContainer.removeClassName("visible");
      this.timerStepsContainer.setOpacity("1");
    }, 500);
  }

  private hideTimerStemps() {
    this.timerStepsContainer.removeClassName("visible");
    this.timerStepsContainer.addClassName("invisible");
    setTimeout(() => {
      this.timerStepsContainer.removeClassName("invisible");
      this.timerStepsContainer.setVisibility("hidden");
      this.timerStepsContainer.setOpacity("0");
    }, 500);
  }

  public returnDefaults() {
    this.timerStepsInput.returnDefaults();
    this.timerStepsContainer.returnDefaults();
    localStorage.setItem(
      "timerStempsOpacity",
      (this.timerStepsContainer.element.style.opacity = "0")
    );
  }
}

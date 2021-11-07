import { Input } from "./Input";

export class Checkbox extends Input {
  constructor() {
    super("checkbox");
  }

  isChecked() {
    return this.element.checked;
  }

  toggle() {
    this.element.checked = !this.isChecked();
  }
}

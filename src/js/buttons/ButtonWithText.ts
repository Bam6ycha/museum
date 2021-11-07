import { Button } from "./Button";

class ButtonWithText extends Button {
  constructor(buttonClassName: string, textContent: string) {
    super(buttonClassName);

    this.addTextToButton(textContent);
  }

  addTextToButton(text: string) {
    this.element.textContent = `${text}`;
  }
}

export { ButtonWithText };

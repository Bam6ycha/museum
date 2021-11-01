import { Buttons } from "./Buttons";

class ButtonsWithText extends Buttons {
  buttonText: string;
  constructor(
    buttonText: string,
    conteinerClassName: string,
    buttonClassName: string
  ) {
    super(conteinerClassName, buttonClassName);
    this.buttonText = this.addTextToButton(buttonText);
  }

  addTextToButton(text: string) {
    return (this.element.textContent = `${text}`);
  }
}

export { ButtonsWithText };

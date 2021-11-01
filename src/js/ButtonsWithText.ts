import { Buttons } from "./Buttons";

class ButtonsWithText extends Buttons {
  constructor(buttonClassName: string) {
    super(buttonClassName);
  }

  addTextToButton(text: string) {
    return (this.element.textContent = `${text}`);
  }
  createFullElement(
    containerClassName: string,
    buttonClassName: string,
    buttonText: string
  ) {
    super.createButtonElement();
    super.findNecessaryContainer(containerClassName);
    super.addElementinContainer();
    super.addClassToButtonElement(buttonClassName);
    this.addTextToButton(buttonText);
  }
}
const buttonsCreator = new ButtonsWithText(".settings-footer");
export { buttonsCreator };

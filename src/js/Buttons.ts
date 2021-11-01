class Buttons {
  element: HTMLButtonElement;
  container: HTMLDivElement;

  // buttonClassName: string;
  constructor(buttonClassName: string) {
    this.element = this.createButtonElement();
    this.container = this.findNecessaryContainer(buttonClassName);
    // this.addElementinContainer();
    // this.buttonClassName = this.addClassToButtonElement(buttonClassName);
  }
  createButtonElement() {
    return (this.element = document.createElement("button"));
  }
  findNecessaryContainer(className: string) {
    return (this.container = document.querySelector(
      `${className}`
    ) as HTMLDivElement);
  }
  addElementinContainer() {
    this.container.append(this.element);
  }
  addClassToButtonElement(className: string) {
    this.element.classList.add(`${className}`);
    return className;
  }
  actionsOnClick(callBack: EventListenerOrEventListenerObject) {
    this.element.addEventListener("click", callBack);
  }
}

export { Buttons };

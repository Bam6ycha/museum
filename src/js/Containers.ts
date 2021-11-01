class Containers {
  element: HTMLDivElement;
  className: string;
  constructor(containerNameToAdd: string, className: string) {
    this.element = this.creatElement();
    this.addElementInDocument(containerNameToAdd);
    this.className = this.addClassName(className);
  }
  creatElement() {
    return (this.element = document.createElement("div"));
  }
  getParentElement(text: string) {
    return document.querySelector(text) as HTMLDivElement;
  }
  addElementInDocument(text: string) {
    const parentElement = this.getParentElement(text);
    parentElement.append(this.element);
  }
  addClassName(className: string) {
    this.element.classList.add(className);
    return className;
  }
}

export { Containers };

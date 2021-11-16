import { Container } from "./Container";

export class PictureQuizeImages extends Container {
  container: Container;

  imageContainers: Container[];

  constructor(className: string) {
    super(className);

    this.imageContainers = this.createImageContainers();

    this.container = new Container("pictureQuize-main__imageMainContainer", [
      ...this.imageContainers.map((imageContainer) => imageContainer.element)
    ]);

    this.element = this.container.element;
  }

  private createImageContainers() {
    const containers: Container[] = [];

    for (let i = 0; i < 4; i++) {
      const container = new Container("pictureQuize-main__imageContainer");
      containers.push(container);
    }
    return containers;
  }

  public insertImages(image: HTMLImageElement[]) {
    this.imageContainers.forEach((imageContainer, index) =>
      imageContainer.append(image[index])
    );
  }

  public getChildren() {
    const children: HTMLImageElement[] = Array.from(
      this.container.element.children
    ).map((item) => item.firstChild) as HTMLImageElement[];
    return children;
  }

  public removeChildren() {
    const children = this.getChildren();
    children.forEach((child) => child.remove());
  }

  public onClick(listener: EventListener) {
    this.imageContainers.forEach((container) =>
      container.addListener("click", listener)
    );
  }
}

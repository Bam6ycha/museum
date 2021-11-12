export class Anchor {
  public element: HTMLAnchorElement;

  constructor(href: string) {
    this.element = this.createAnchorElement();
    this.setHref(href);
    this.setAttributeTarget();
  }

  public addClassName(className: string) {
    this.element.classList.add(className);
    return this;
  }

  private setAttributeTarget() {
    this.element.setAttribute("target", "_blank");
  }

  private createAnchorElement() {
    return document.createElement("a");
  }

  public removeClassName(className: string) {
    this.element.classList.remove(className);
    return this;
  }

  private setHref(href: string) {
    this.element.setAttribute("href", href);
    return this;
  }

  public setText(text: string) {
    this.element.textContent = text;
    return this;
  }

  public setImg(url: string) {
    const img = document.createElement("img");
    img.src = url;
    this.element.append(img);
    return this;
  }
}

import { Button } from "./Button";

class ButtonWithImg extends Button {
  constructor(source: string, buttonClassName: string) {
    super(buttonClassName);
    this.setImgAsBackGround(source);
  }

  setImgAsBackGround(src: string) {
    this.element.style.backgroundImage = `url(${src})`;
  }
}

export { ButtonWithImg };

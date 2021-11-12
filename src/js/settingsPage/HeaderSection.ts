import { Container } from "../Container/Container";

export class Header {
  private header: Container;

  public element: HTMLDivElement;

  private wrapper: Container;

  private description: Container;

  private logo: Container;

  constructor() {
    this.logo = new Container("settings-header__logo");
    this.description = new Container("settings-header__description").setText(
      "SETTINGS"
    );

    this.wrapper = new Container("settings-header__wrapper", [
      this.logo.element,
      this.description.element
    ]);

    this.header = new Container("settings-header", [this.wrapper.element]);
    this.element = this.header.element;
  }
}

import { Container } from "../Container";

import { Footer } from "./FooterSection";

import { Header } from "./HeaderSection";

import { Main } from "./MainSection";

export class SettingsPage {
  public element: HTMLDivElement;

  private header: Header;

  private container: Container;

  private main: Main;

  private footer: Footer;

  public constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    this.container = new Container("settings", [
      this.header.element,
      this.main.element,
      this.footer.element
    ]).addClassName("hidden");
    this.element = this.container.element;
  }

  public onDomLoad() {
    return this.main.onDomLoad();
  }

  public toggleCheckBox() {
    this.main.getTimer();
  }

  public show() {
    if (this.container.hasClass("hidden")) {
      this.container.addClassName("from-left");
      this.container.addListeners("animationend", () => {
        this.container.removeClassName("from-left");
        this.container.removeClassName("hidden");
      });
    }
  }

  public validateInput() {
    return this.main.validateInput();
  }
}

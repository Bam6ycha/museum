import { Container } from "../Container/Container";

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
    this.saveSettings(() => this.hide());
    this.defaultSettings(() => {
      this.returnDefaults();
    });
  }

  private defaultSettings(listener: EventListener) {
    this.footer.defaultSettings(listener);
  }

  private returnDefaults() {
    this.main.returnDefaults();
  }

  public show() {
    if (this.container.hasClass("hidden")) {
      this.container.addClassName("from-left");
      this.container.addListener("animationend", () => {
        this.container.removeClassName("from-left");
        this.container.removeClassName("hidden");
        this.container.addClassName("show");
      });
    }
  }

  private hide() {
    this.container.addClassName("to-left");
    this.container.addListener("animationend", () => {
      this.container.addClassName("hidden");
      this.container.removeClassName("to-left");
      this.container.removeClassName("show");
    });
  }

  private saveSettings(listener: EventListener) {
    this.footer.saveSettigs(listener);
  }
}

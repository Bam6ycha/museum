import { ButtonWithText } from "../buttons/ButtonWithText";
import { Container } from "../Container/Container";

export class Footer {
  public element: HTMLDivElement;

  private saveButton: ButtonWithText;

  private defaultsButton: ButtonWithText;

  footer: Container;

  constructor() {
    this.saveButton = new ButtonWithText(
      "settings-footer__cherryButton",
      "SAVE"
    );

    this.defaultsButton = new ButtonWithText(
      "settings-footer__cherryButton",
      "DEFAULTS"
    );

    this.footer = new Container("settings-footer", [
      this.saveButton.element,
      this.defaultsButton.element
    ]);

    this.element = this.footer.element;
  }

  defaultSettings(listener: EventListener) {
    this.defaultsButton.OnClick(listener);
  }

  saveSettigs(listener: EventListener) {
    this.saveButton.OnClick(listener);
  }
}

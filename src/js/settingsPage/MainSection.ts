import { Container } from "../Container/Container";
import { TimerSection } from "./TimerSection";

import { Volume } from "./VolumeSection";

export class Main {
  public element: HTMLDivElement;

  private main: Container;

  private volumeSection: Volume;

  private timerSection: TimerSection;

  constructor() {
    this.volumeSection = new Volume();

    this.timerSection = new TimerSection();

    this.main = new Container("settings-main", [
      this.volumeSection.element,
      this.timerSection.element
    ]);
    this.element = this.main.element;
  }

  public returnDefaults() {
    this.timerSection.returnDefaults();
    this.volumeSection.returnDefaults();
  }
}

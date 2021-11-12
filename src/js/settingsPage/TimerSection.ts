import { Container } from "../Container/Container";
import { Timer } from "../timer/Timer";

export class TimerSection {
  public element: HTMLDivElement;

  private timerContainer: Container;

  private timerDescription: Container;

  private timer: Timer;

  constructor() {
    this.timer = new Timer();

    this.timerDescription = new Container(
      "settings-main__TimerDescription_cherryCappytalize"
    ).setText("TIME GAME");

    this.timerContainer = new Container("settings-main__Timer", [
      this.timer.element,
      this.timerDescription.element
    ]);

    this.element = this.timerContainer.element;
  }

  public returnDefaults() {
    this.timer.returnDefaults();
  }
}

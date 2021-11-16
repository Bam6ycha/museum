import { ChildElement } from "../childElementType";
import { Bullet, BulletStates } from "../components/Bullet";
import { Container } from "./Container";

export class ContainerBullets extends Container {
  public element: HTMLDivElement;

  public counter: number;

  private bulletsContainer: Container;

  private bullets: Bullet[];

  constructor(className: string, children?: ChildElement[]) {
    super(className, children);

    this.counter = 0;

    this.bullets = this.createBullets();

    this.bulletsContainer = new Container(
      "artistQuizQuestions-mainContainer__bullets",
      [...this.bullets.map((bullet) => bullet.element)]
    );

    this.element = this.bulletsContainer.element;
    this.showNextActive();
  }

  private createBullets() {
    const bulletsAmount = 10;
    const bullets: Bullet[] = [];
    for (let i = 0; i < bulletsAmount; i++) {
      const bullet = new Bullet();
      bullets.push(bullet);
    }
    return bullets;
  }

  public showNextActive() {
    if (this.counter < 10) {
      this.bullets[this.counter].changeBulletState(BulletStates.Active);
      this.counter++;
    }
    if (this.counter > 10) {
      this.counter = 0;
    }
  }

  public showRightAnswer() {
    this.bullets[this.counter - 1].changeBulletState(BulletStates.RightAnswer);
  }

  public showWrongAnswer() {
    this.bullets[this.counter - 1].changeBulletState(BulletStates.WrongAnswer);
  }

  public resetState() {
    this.counter = 0;
  }

  public updateState() {
    this.bullets.forEach((bullet) =>
      bullet.element.classList.remove(
        BulletStates.RightAnswer,
        BulletStates.WrongAnswer,
        BulletStates.Active
      )
    );
    this.showNextActive();
  }

  getCounter() {
    return this.counter;
  }
}

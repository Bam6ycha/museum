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

    this.counter = -1;

    this.bullets = this.createBullets();

    this.bulletsContainer = new Container(
      "artistQuizQuestions-mainContainer__bullets",
      [...this.bullets.map((bullet) => bullet.element)]
    );

    this.element = this.bulletsContainer.element;
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
    if (this.counter <= 9) {
      this.bullets[this.counter].changeBulletState(BulletStates.Active);
      this.counter++;
    } else {
      this.counter++;
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
  }

  getCounter() {
    return this.counter;
  }
}

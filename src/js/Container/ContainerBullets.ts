import { ChildElement } from "../childElementType";
import { Container } from "./Container";

export class ContainerBullets extends Container {
  public element: HTMLDivElement;

  public counter: number;

  private bulletsContainer: Container;

  private bullets: HTMLDivElement[];

  constructor(className: string, children?: ChildElement[]) {
    super(className, children);

    this.counter = 0;

    this.bullets = this.createBullets();

    this.bulletsContainer = new Container(
      "artistQuizQuestions-mainContainer__bullets",
      [...this.bullets]
    );
    this.nextActive();
    this.element = this.bulletsContainer.element;
  }

  public activeBullet() {
    this.bullets[this.counter].classList.add("active");
    return this;
  }

  private createBullets() {
    const bulletsAmount = 10;
    const bullets: HTMLDivElement[] = [];
    for (let i = 0; i < bulletsAmount; i++) {
      const bullet = new Container("answerBullet");
      bullets.push(bullet.element);
    }
    return bullets;
  }

  public nextActive() {
    this.bullets[this.counter].classList.add("active");
    this.counter++;
  }

  public rightAnswer() {
    this.bullets[this.counter].classList.add("rightAnswer");
  }

  public wrongAnswer() {
    this.bullets[this.counter].classList.add("wrongAnswer");
  }
}

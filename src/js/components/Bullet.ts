export enum BulletStates {
  Active = "active",
  WrongAnswer = "wrongAnswer",
  RightAnswer = "rightAnswer"
}

export class Bullet {
  public element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("answerBullet");
  }

  public changeBulletState(state: BulletStates) {
    this.element.classList.add(state);
    return this;
  }
}

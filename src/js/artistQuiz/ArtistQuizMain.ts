import { Container } from "../Container/Container";

export class ArtisQuizMain {
  public element: HTMLDivElement;

  private wrapper: Container;

  private card: Container;

  private cardDescriptionContainer: Container;

  constructor() {
    this.cardDescriptionContainer = new Container("artistQuiz__card");
    this.card = new Container("artistQuiz__card");
    this.card.addClassName("hiddenBottom");

    // this.creatCardsAndSoreIndex();
    this.wrapper = new Container("artistQuiz-main", [this.card.element]);
    this.element = this.wrapper.element;
  }

  // async creatCardsAndSoreIndex() {
  //   const cards = await this.card.createSomeElementsWithImg(
  //     imgNumer.length,
  //     "artistQuiz-main__card"
  //   );
  //   cards.forEach((item) => {
  //     this.card.append(item);
  //     item.addEventListener("click", (e) => {
  //       if (!e.target) {
  //         return;
  //       }
  //       const eventTarget = e.target;
  //       if (
  //         eventTarget === item.firstElementChild ||
  //         eventTarget === item.lastElementChild
  //       ) {
  //         localStorage.setItem("artistQuizCategory", `${cards.indexOf(item)}`);
  //       }
  //     });
  //   });
  // }

  hideCards() {
    this.card.addClassName("to-bottom");
    this.card.addListener("animationend", () => {
      this.card
        .addClassName("hiddenBottom")
        .removeClassName("to-bottom")
        .removeClassName("showFromBottom");
    });
  }

  showCards() {
    this.card.addClassName("from-bottom");
    this.card.addListener("animationend", () => {
      this.card
        .addClassName("showFromBottom")
        .removeClassName("from-bottom")
        .removeClassName("hiddenBottom");
    });
  }

  showCardsContainer() {
    if (this.card.hasClass("showFromBottom")) {
      this.hideCards();
    } else {
      this.showCards();
    }
  }
}

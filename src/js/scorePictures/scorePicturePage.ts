import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { ArtisQuizHeader } from "../artistQuiz/ArtistQuizHeader";
import { Container } from "../Container/Container";
import { ScoreCategories } from "../scoreArtist/scoreCategories";
import { ScorePicturesMain } from "./scorePicturesMain";

export class ScorePicturePage extends Container {
  container: Container;

  wrapper: Container;

  header: ArtisQuizHeader;

  categories: ScoreCategories;

  main: ScorePicturesMain;

  footer: ArtisQuizFooter;

  constructor(className: string) {
    super(className);

    this.footer = new ArtisQuizFooter();

    this.main = new ScorePicturesMain("score-main__cardsContainer");

    this.header = new ArtisQuizHeader();

    this.categories = new ScoreCategories("categorie-artistQuiz__wrapper");
    this.wrapper = new Container("score-wrapper", [
      this.header.element,
      this.categories.element,
      this.main.element,
      this.footer.element
    ]);

    this.container = new Container("score-page", [this.wrapper.element]);
    this.container.addClassName("hidden");

    this.element = this.container.element;

    this.hideShowHome();
  }

  hidePage() {
    this.container.addClassName("to-left");

    setTimeout(() => {
      this.container
        .addClassName("hidden")
        .removeClassName("show")
        .removeClassName("to-left");
    }, 500);
  }

  showPage() {
    if (this.container.hasClass("hidden")) {
      this.container.addClassName("from-left");
      this.container.addListener("animationend", () => {
        this.container
          .addClassName("show")
          .removeClassName("from-left")
          .removeClassName("hidden");
      });
    }
  }

  async showScore() {
    await this.main.showScore();
  }

  private hideShowHome() {
    this.categories.hideShowHome(() => {
      this.hidePage();
      setTimeout(() => {
        this.main.removeImages();
        this.main.resetCardsState();
      }, 600);
    });
  }

  public hideShowCategories(listener: EventListener) {
    this.categories.hideShowCategories(listener);
  }

  public resetCardsState() {
    this.main.resetCardsState();
    this.main.removeImages();
  }
}

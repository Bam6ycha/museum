import { ArtisQuizFooter } from "../artistQuiz/ArtistQuizFooter";
import { ArtisQuizHeader } from "../artistQuiz/ArtistQuizHeader";
import { Container } from "../Container/Container";
import { ScoreCategories } from "./scoreCategories";
import { ScoreMain } from "./scoreMain";

export class ScorePage extends Container {
  container: Container;

  wrapper: Container;

  header: ArtisQuizHeader;

  categories: ScoreCategories;

  main: ScoreMain;

  footer: ArtisQuizFooter;

  constructor(className: string) {
    super(className);

    this.footer = new ArtisQuizFooter();

    this.main = new ScoreMain("score-main__cardsContainer");

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
  }
}

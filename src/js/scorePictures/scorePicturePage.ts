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

    this.element = this.container.element;
  }
}

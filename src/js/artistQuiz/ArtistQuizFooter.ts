import { Anchor } from "../Ancor";
import { Container } from "../Container/Container";

export class ArtisQuizFooter {
  element: HTMLDivElement;

  wrapper: Container;

  author: Anchor;

  rsLogo: Anchor;

  constructor() {
    this.author = new Anchor("https://github.com/Bam6ycha");
    this.author.addClassName("authorName");
    this.author.setText("Bambycha");

    this.rsLogo = new Anchor("https://rs.school/");
    this.rsLogo.addClassName("footer__rsLogo");

    this.wrapper = new Container("artisquiz-footer", [
      this.author.element,
      this.rsLogo.element
    ]);

    this.element = this.wrapper.element;
  }
}

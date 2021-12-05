class BurgerMenu {
  private menuBody: HTMLDivElement;

  private icon: HTMLDivElement;

  constructor() {
    this.icon = document.querySelector(".menu__ico") as HTMLDivElement;

    this.menuBody = document.querySelector(".menu__body") as HTMLDivElement;

    this.show();
    this.hide();
  }

  private show() {
    if (this.icon) {
      this.icon.addEventListener("click", () => {
        document.body.classList.toggle("_lock");
        this.icon.classList.toggle("_active");
        this.menuBody.classList.toggle("_active");
        this.hideMenuOnLinksClick();
      });
    }
  }

  private hide() {
    if (this.icon.classList.contains("_active")) {
      document.body.classList.remove("_lock");
      this.icon.classList.remove("_active");
      this.menuBody.classList.remove("_active");
    }
  }

  private hideMenuOnLinksClick() {
    const links = document.getElementsByClassName(
      "source__item"
    ) as HTMLCollectionOf<HTMLDivElement>;

    [...links].forEach((link) =>
      link.addEventListener("click", () => this.hide())
    );
  }
}

export const burgerMenu = new BurgerMenu();

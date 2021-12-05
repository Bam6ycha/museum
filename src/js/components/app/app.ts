import AppController from "../controller/controller";
import { AppInterface } from "../interfaces/appInterface";
import { AppView } from "../view/appView";

class App implements AppInterface {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    const source = document.querySelector(".menu__body") as HTMLDivElement;
    console.log(source);
    source.addEventListener("click", (e) =>
      this.controller.getNews(e, (data) => this.view.drawNews(data))
    );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;

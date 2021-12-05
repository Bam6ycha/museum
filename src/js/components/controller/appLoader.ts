import Loader from "./loader";

class AppLoader extends Loader {
  constructor() {
    super("https://nodenews.herokuapp.com/", {
      apiKey: "a8ac38dc4157435ba38c741838c8af19"
    });
  }
}

export default AppLoader;

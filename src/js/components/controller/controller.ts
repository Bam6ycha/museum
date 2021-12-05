import { EndPoints } from "../enums/endpoints";
import { NewsResponse } from "../interfaces/response";
import AppLoader from "./appLoader";

class AppController extends AppLoader {
  getSources(callback: (data: NewsResponse) => void) {
    super.getResp(
      {
        endpoint: EndPoints.Sources
      },
      callback
    );
  }

  public getNews(e: MouseEvent, callback: (data: NewsResponse) => void) {
    if (e.target) {
      let target = e.target as HTMLDivElement | HTMLSpanElement;
      const newsContainer = e.currentTarget as HTMLDivElement;
      if (newsContainer) {
        while (target !== newsContainer) {
          if (target.classList.contains("source__item")) {
            const sourceId = target.getAttribute("data-source-id");
            if (
              newsContainer.getAttribute("data-source") !== sourceId &&
              sourceId
            ) {
              newsContainer.setAttribute("data-source", sourceId);
              super.getResp(
                {
                  endpoint: EndPoints.Everything,
                  options: {
                    sources: sourceId
                  }
                },
                callback
              );
            }
            return;
          }
          target = target.parentNode as HTMLDivElement;
        }
      }
    }
  }
}

export default AppController;

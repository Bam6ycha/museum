// import "./news.css";

import { Article } from "../../interfaces/article";

class News {
  public draw(data: Article[]) {
    const news =
      data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const newsItemTemp = document.querySelector(
      "#newsItemTemp"
    ) as HTMLTemplateElement;

    news.forEach((item, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(
        true
      ) as HTMLTemplateElement;

      if (idx % 2) {
        const newsContainer = newsClone.querySelector(
          ".news__item"
        ) as HTMLDivElement;
        newsContainer.classList.add("alt");
      }

      const newsImage = newsClone.querySelector(
        ".news__meta-photo"
      ) as HTMLDivElement;
      newsImage.style.backgroundImage = `url(${
        item.urlToImage || "img/news_placeholder.jpg"
      })`;
      const author = newsClone.querySelector(
        ".news__meta-author"
      ) as HTMLUListElement;
      author.textContent = item.author || item.source.name;
      const date = newsClone.querySelector(
        ".news__meta-date"
      ) as HTMLUListElement;
      date.textContent = item.publishedAt
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");

      const title = newsClone.querySelector(
        ".news__description-title"
      ) as HTMLHeadingElement;
      title.textContent = item.title;
      const source = newsClone.querySelector(
        ".news__description-source"
      ) as HTMLHeadingElement;
      source.textContent = item.source.name;
      const description = newsClone.querySelector(
        ".news__description-content"
      ) as HTMLParagraphElement;
      description.textContent = item.description;
      const link = newsClone.querySelector(
        ".news__read-more a"
      ) as HTMLAnchorElement;
      link.setAttribute("href", item.url);

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector(".news") as HTMLDivElement;
    newsContainer.innerHTML = "";
    newsContainer.appendChild(fragment);
  }
}

export default News;

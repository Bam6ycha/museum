let currentTimeOfDay: string;
function getCurrentTimeOfDay() {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    return (currentTimeOfDay = "morning");
  }
  if (currentHour >= 12 && currentHour < 18) {
    return (currentTimeOfDay = "afternoon");
  }
  if (currentHour >= 18 && currentHour < 24) {
    return (currentTimeOfDay = "evening");
  }
  if (currentHour >= 0 && currentHour < 6) {
    return (currentTimeOfDay = "night");
  }
  return;
}
const inputUsplash = document.getElementById(
  "Unsplash API"
) as HTMLInputElement;
const container = document.querySelector(".container") as HTMLDivElement;
const next = document.querySelector(".slide_next") as HTMLButtonElement;
const prev = document.querySelector(".slide_prev") as HTMLButtonElement;
let randomPictureIndex: number;
const sourceContainer = document.querySelector(
  ".settings-container__pisctureAPI"
) as HTMLDivElement;

const currentSource: string =
  localStorage.getItem("source") === "GitHub"
    ? "GitHub"
    : localStorage.getItem("source") === "Unsplash"
    ? "Unsplash"
    : "Flickr";

if (currentSource === "Unsplash") {
  const query = localStorage.getItem("query");
  async function photoesFromUnsplash() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query} ${getCurrentTimeOfDay()}&client_id=J0tBDgncZg6sfYKGo5BlIZNkd2SvPtb1IgTtoTBO3Wk`
      );
      const result = await response.json();
      const collection = await result;
      console.log(response);
      const randomPicture = (randomPictureIndex = Math.floor(
        1 - 0.5 + Math.random() * (collection.results.length - 1 - 1 + 1)
      ));
      const currentUrl = collection.results[randomPicture].urls.regular;
      const img = document.createElement("img");
      img.src = currentUrl;
      container.append(img);
      img.classList.add("ibg");
      container.classList.add("show");
      setTimeout(() => container.classList.remove("show"), 3000);
    } catch (err) {
      const language = localStorage.getItem("language") === "ru" ? "ru" : "eng";

      if (language === "ru") {
        const div: HTMLDivElement = document.createElement("div");
        sourceContainer.append(div);
        div.classList.add("err");
        div.style.position = "absolute";
        div.style.zIndex = "-1";
        const coordinates = inputUsplash.getBoundingClientRect();
        div.style.top = coordinates.top - 10 + "px";
        div.innerHTML = `Введите корректные данные`;
      }
      if (language === "eng") {
        const div: HTMLDivElement = document.createElement("div");
        sourceContainer.append(div);
        div.classList.add("err");
        div.style.position = "absolute";
        div.style.zIndex = "-1";
        const coordinates = inputUsplash.getBoundingClientRect();
        div.style.top = coordinates.top - 10 + "px";
        div.innerHTML = `Input isn't correct`;
      }
    }
    inputUsplash.addEventListener("focus", () =>
      document.querySelector(".err")?.remove()
    );
  }
  document.querySelector("body > div.container.ibg > img");
  next.addEventListener("click", () => {
    container.classList.add("hide");
    container.addEventListener("animationend", () =>
      container.classList.remove("hide")
    );
    photoesFromUnsplash();
    if (document.querySelectorAll<HTMLImageElement>(".ibg>img").length > 2) {
      container
        .querySelector<HTMLImageElement>(".ibg > img:nth-child(1)")
        ?.remove();
    }
  });
  prev.addEventListener("click", () => {
    container.classList.add("hide");
    container.addEventListener("animationend", () =>
      container.classList.remove("hide")
    );
    photoesFromUnsplash();
    if (document.querySelectorAll<HTMLImageElement>(".ibg>img").length > 2) {
      container
        .querySelector<HTMLImageElement>(".ibg > img:nth-child(1)")
        ?.remove();
    }
  });
  window.addEventListener("DOMContentLoaded", photoesFromUnsplash);
}
if (currentSource === "GitHub") {
  function getUrl(): string {
    let indexToString: string = "";
    if (randomPictureIndex < 10) {
      indexToString = `0${randomPictureIndex}`;
    } else {
      indexToString = `${randomPictureIndex}`;
    }
    return `https://raw.githubusercontent.com/Bam6ycha/stage1-tasks/assets/images/${getCurrentTimeOfDay()}/${indexToString}.jpg`;
  }

  function getRandomPictureIndex(): number {
    const minPictureIndex: number = 1;
    const maxPictureIndex: number = 20;
    randomPictureIndex = Math.floor(
      minPictureIndex -
        0.5 +
        Math.random() * (maxPictureIndex - minPictureIndex + 1)
    );

    return randomPictureIndex === 0 || 21
      ? (randomPictureIndex = 1)
      : randomPictureIndex;
  }

  async function getImg() {
    const response = await fetch(getUrl(), {
      method: "GET",
      mode: "cors",
    });

    const result = await response.blob();

    const myImage = new Image();
    myImage.src = URL.createObjectURL(result);

    myImage.addEventListener("load", function () {
      container?.append(myImage);
      container?.classList.remove("hide");
      container?.classList.add("show");
    });

    setTimeout(() => container?.classList.remove("show"), 3000);

    myImage.classList.add("ibg");
  }
  document.addEventListener("DOMContentLoaded", function () {
    getRandomPictureIndex();
    getUrl();
    getImg();
  });

  // //!--------------Create-slider-------------//
  next.addEventListener("click", function () {
    container?.classList.add("hide");
    if (randomPictureIndex === 20) {
      randomPictureIndex = 1;
      if (document.querySelectorAll(".ibg>img").length > 1) {
        document.querySelector(".ibg > img:nth-child(1)")?.remove();
      }
      getImg();
    } else {
      randomPictureIndex++;
      if (document.querySelectorAll(".ibg>img").length > 1) {
        document.querySelector(".ibg > img:nth-child(1)")?.remove();
      }
      getImg();
    }
  });

  prev.addEventListener("click", function () {
    container?.classList.add("hide");
    if (randomPictureIndex === 1) {
      randomPictureIndex = 20;
      if (document.querySelectorAll(".ibg>img").length > 1) {
        document.querySelector(".ibg > img:nth-child(1)")?.remove();
      }
      getImg();
    } else {
      randomPictureIndex--;
      if (document.querySelectorAll(".ibg>img").length > 1) {
        document.querySelector(".ibg > img:nth-child(1)")?.remove();
      }
      getImg();
    }
  });
}

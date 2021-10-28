const api = () => {
  const language = localStorage.getItem("language");
  const city: any = document.querySelector(".city");

  const weatherIcon: any = document.querySelector(".weather-icon");
  const temperature: any = document.querySelector(".temperature");
  const weatherDescription: any = document.querySelector(
    ".weather-description"
  );
  const humidity: any = document.querySelector(".humidity");
  const wind: any = document.querySelector(".wind");
  async function createWeatherApi() {
    const userCity = city.value;
    if (!userCity) {
      let cityDependsOnLanguage;
      language === "ru"
        ? (cityDependsOnLanguage = "Минск")
        : (cityDependsOnLanguage = "Minsk");
      localStorage.setItem("city", `${cityDependsOnLanguage}`);
      const div = document.createElement("div");
      document.querySelector(".header-weather")?.append(div);
      div.style.position = "absolute";
      div.classList.add("err");
      let coordinates = city.getBoundingClientRect();
      div.style.left = coordinates.left - coordinates.width + "px";
      div.style.top = coordinates.top + "px";
      div.textContent = `${
        language === "eng" ? "Enter city" : "Введите Ваш город"
      }`;
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=${language}&appid=6cbe690859b8bb3ff05bdf9c2ce50513&units=metric`
    );
    try {
      const result = await response.json();
      weatherIcon.classList.add(`owf-${result.weather[0].id}`);
      temperature.textContent = `${Math.ceil(result.main.temp)}°C`;
      weatherDescription.textContent = result.weather[0].description;
      wind.textContent = `${language === "ru" ? "Влажность" : "Humidity"} ${
        result.main.humidity
      }%`;
      humidity.textContent = `${
        language === "ru" ? "Ветер" : "Wind"
      } ${Math.ceil(result.wind.speed)} ${language === "ru" ? "м/c" : "m/s"}`;
    } catch (err: any) {
      let cityDependsOnLanguage;
      language === "ru"
        ? (cityDependsOnLanguage = "Минск")
        : (cityDependsOnLanguage = "Minsk");
      localStorage.setItem("city", `${cityDependsOnLanguage}`);
      const div: HTMLDivElement = document.createElement("div");
      document.querySelector(".header-weather")?.append(div);
      div.style.position = "absolute";
      div.classList.add("err");
      let coordinates = city.getBoundingClientRect();
      div.style.left = coordinates.left - coordinates.width * 2.5 + "px";
      div.style.top = coordinates.top + "px";
      div.textContent = `${
        language === "eng"
          ? "Your input isn`t correct"
          : "Вы ввели некорректные данные"
      }`;
    }
  }
  createWeatherApi();
  city.addEventListener("focus", () =>
    document.querySelector(".err")?.remove()
  );
  city.addEventListener("blur", () => {
    localStorage.setItem("city", city.value);
    createWeatherApi();
  });
  window.addEventListener("DOMContentLoaded", () => {
    city.value = localStorage.getItem("city") ?? "Minsk";
  });
};

api();

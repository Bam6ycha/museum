let language: string | null;
const turnOnEng = document.querySelector(
  ".settings-container__language > button.en"
) as HTMLButtonElement;
const turnOnRu = document.querySelector(
  ".settings-container__language > button.ru"
) as HTMLButtonElement;
function curentLanguage() {
  if (turnOnEng.classList.contains("turnOn")) {
    language = turnOnEng.innerHTML;
    localStorage.setItem("language", language);
  }
  if (turnOnRu.classList.contains("turnOn")) {
    language = turnOnRu.innerHTML;
    localStorage.setItem("language", language);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  curentLanguage();

  language = localStorage.getItem("language");
  if (language === "eng") {
    turnOnEng.classList.add("turnOn");
    turnOnRu.classList.add("turnOff");
  }
  if (language === "ru") {
    turnOnRu.classList.add("turnOn");
    turnOnEng.classList.add("turnOff");
  }
});
turnOnEng.addEventListener("click", curentLanguage);
turnOnRu.addEventListener("click", curentLanguage);

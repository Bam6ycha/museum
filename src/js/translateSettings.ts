function translate() {
  const language = localStorage.getItem("language");
  const settings = Array.from(
    document.querySelectorAll<HTMLDivElement>(
      ".settings-container__description"
    )
  );
  const settingsInEngText: any = Array.from(
    document.querySelectorAll<HTMLDivElement>(
      ".settings-container__description"
    )
  ).forEach((item) => item.innerHTML);
  const settingsInRuText = [
    "Выбирите язык",
    "Отображать доп.опции у плеера",
    "Отображать плайлист",
    "Отображать время",
    "Отображать дату",
    "Отображать погоду",
    "Отображать приветствие",
    "Отображать цитаты",
    "Выбирите ресурс",
  ];
  const currentSettingsLanguage =
    language === "ru" ? settingsInRuText : settingsInEngText;
  for (let i = 0; i < currentSettingsLanguage.length; i++) {
    settings[i].innerHTML = currentSettingsLanguage[i];
  }
}
window.addEventListener("DOMContentLoaded", translate);

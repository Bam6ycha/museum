import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function hideShowHeaderWeaher() {
  const weatherContainer = document.querySelector(
    ".header-weather"
  ) as HTMLDivElement;
  const weatherBurronTurnOn = document.querySelector(
    ".settings-container__weather > button.on"
  ) as HTMLButtonElement;
  const weatherBurronTurnOff = document.querySelector(
    ".settings-container__weather > button.off"
  ) as HTMLButtonElement;
  toggle(
    [weatherContainer],
    weatherBurronTurnOn,
    weatherBurronTurnOff,
    "HeaderWeather"
  );

  window.addEventListener("DOMContentLoaded", () => {
    weatherContainer.style.opacity =
      localStorage.getItem("opacityHeaderWeather") ?? OpacityValues.On;

    if (localStorage.getItem("opacityHeaderWeather") === OpacityValues.On) {
      weatherBurronTurnOn?.classList.add("turnOn");
      weatherBurronTurnOff?.classList.add("turnOff");
      weatherContainer.style.visibility = "";
    }
    if (localStorage.getItem("opacityHeaderWeather") === OpacityValues.Off) {
      weatherBurronTurnOn?.classList.add("turnOff");
      weatherBurronTurnOff?.classList.add("turnOn");
      weatherContainer.style.visibility = "hidden";
    }
  });
  weatherBurronTurnOn?.addEventListener("click", () =>
    toggle(
      [weatherContainer],
      weatherBurronTurnOn,
      weatherBurronTurnOff,
      "HeaderWeather"
    )
  );
  weatherBurronTurnOff?.addEventListener("click", () =>
    toggle(
      [weatherContainer],
      weatherBurronTurnOn,
      weatherBurronTurnOff,
      "HeaderWeather"
    )
  );
}
hideShowHeaderWeaher();

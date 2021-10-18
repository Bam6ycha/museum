import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function showHideQuotes() {
  const quotes = document.querySelector(".qutotes-day") as HTMLDivElement;
  const quotesButtonOn = document.querySelector(
    ".settings-container__quote > button.on"
  ) as HTMLButtonElement;
  const quotesButtonOff = document.querySelector(
    ".settings-container__quote > button.off"
  ) as HTMLButtonElement;
  toggle([quotes], quotesButtonOn, quotesButtonOff, "quotes");
  window.addEventListener("DOMContentLoaded", () => {
    quotes.style.opacity = `${localStorage.getItem("opacityquotes")}`;
    toggle([quotes], quotesButtonOn, quotesButtonOff, "quotes");
    if (localStorage.getItem("opacityquotes") === OpacityValues.On) {
      quotesButtonOn?.classList.add("turnOn");
      quotesButtonOff?.classList.add("turnOff");
      quotes.style.visibility = "";
    }
    if (localStorage.getItem("opacityquotes") === OpacityValues.Off) {
      quotesButtonOn?.classList.add("turnOff");
      quotesButtonOff?.classList.add("turnOn");
      quotes.style.visibility = "hidden";
    }
  });
  quotesButtonOn?.addEventListener("click", () =>
    toggle([quotes], quotesButtonOn, quotesButtonOff, "quotes")
  );
  quotesButtonOff?.addEventListener("click", () =>
    toggle([quotes], quotesButtonOn, quotesButtonOff, "quotes")
  );
}

showHideQuotes();

import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function showHideGreetings() {
  const greetings = document.querySelector(".greetings") as HTMLDivElement;
  const greetingsbuttonOn = document.querySelector(
    ".settings-container__greatings > button.on"
  ) as HTMLButtonElement;
  const greetingsbuttonOff = document.querySelector(
    ".settings-container__greatings > button.off"
  ) as HTMLButtonElement;
  toggle([greetings], greetingsbuttonOn, greetingsbuttonOff, "Greetings");

  window.addEventListener("DOMContentLoaded", () => {
    greetings.style.opacity = `${localStorage.getItem("opacityGreetings")}`;
    toggle([greetings], greetingsbuttonOn, greetingsbuttonOff, "Greetings");
    if (localStorage.getItem("opacityGreetings") === OpacityValues.On) {
      greetingsbuttonOn?.classList.add("turnOn");
      greetingsbuttonOff?.classList.add("turnOff");
      greetings.style.visibility = "";
    }
    if (localStorage.getItem("opacityGreetings") === OpacityValues.Off) {
      greetingsbuttonOn?.classList.add("turnOff");
      greetingsbuttonOff?.classList.add("turnOn");
      greetings.style.visibility = "hidden";
    }
  });
  greetingsbuttonOn?.addEventListener("click", () =>
    toggle([greetings], greetingsbuttonOn, greetingsbuttonOff, "Greetings")
  );
  greetingsbuttonOff?.addEventListener("click", () =>
    toggle([greetings], greetingsbuttonOn, greetingsbuttonOff, "Greetings")
  );
}

showHideGreetings();

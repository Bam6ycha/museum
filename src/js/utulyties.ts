import { OpacityValues } from "./enums";

export default function toggle(
  elements: any[],
  turnOnButton: HTMLButtonElement,
  turnOffButton: HTMLButtonElement,
  blockName: string
): void {
  if (
    turnOffButton.classList.contains("turnOn") &&
    elements[0].style.opacity === OpacityValues.On
  ) {
    hideBlockElements(elements, blockName);
  }

  if (
    turnOnButton.classList.contains("turnOn") &&
    elements[0].style.opacity === OpacityValues.Off
  ) {
    showBlockElements(elements, blockName);
  }
}

function hideBlockElements(elements: HTMLDivElement[], blockName: string) {
  elements.forEach((item) => {
    item.classList.add("invisible");
    setTimeout(() => (item.style.visibility = "hidden"), 500);
    item.addEventListener("animationend", () => {
      item.classList.remove("invisible");
      item.style.opacity = "0";
      localStorage.setItem(`opacity${blockName}`, `${item.style.opacity}`);
    });
  });
}

function showBlockElements(elements: HTMLDivElement[], blockName: string) {
  elements.forEach((item) => {
    item.style.visibility = "";
    item.classList.add("visible");
    item.addEventListener("animationend", () => {
      item.classList.remove("visible");
      item.style.opacity = OpacityValues.On;
      localStorage.setItem(`opacity${blockName}`, `${item.style.opacity}`);
    });
  });
}

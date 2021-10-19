function onlyOneSource() {
  const sourceButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".sourceButton")
  );
  const inputUsplash = document.getElementById(
    "Unsplash API"
  ) as HTMLInputElement;
  const inputFlicker = document.getElementById(
    "Flickr API"
  ) as HTMLInputElement;

  function toggle(event: MouseEvent) {
    if (!event.target) {
      return;
    }

    const target: HTMLButtonElement = event.target as HTMLButtonElement;
    const currentTarget: HTMLButtonElement =
      sourceButtons[sourceButtons.indexOf(target)];
    sourceButtons.forEach((item) => {
      item.classList.remove("turnOn");
      item.classList.add("turnOff");
    });

    currentTarget.classList.remove("turnOff");
    currentTarget.classList.add("turnOn");
    if (currentTarget.innerHTML === "GitHub") {
      localStorage.setItem("source", `${currentTarget.innerHTML}`);
    } else {
      localStorage.setItem("source", `${currentTarget.innerHTML}`);
      const nextSubling = currentTarget.nextElementSibling as HTMLInputElement;
      nextSubling.addEventListener("blur", () => {
        localStorage.setItem("query", nextSubling.value);
      });
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    const source = localStorage.getItem("source") as string;
    if (source === null) localStorage.setItem("source", "GitHub");
    const activeButton = sourceButtons.filter((item) => {
      return item.textContent === source;
    });

    sourceButtons.forEach((item) => {
      item.classList.remove("turnOn");
      item.classList.add("turnOff");
    });
    activeButton[0].classList.remove("turnOff");
    activeButton[0].classList.add("turnOn");
    if (activeButton[0].textContent !== "GitHub") {
      const subling = activeButton[0].nextElementSibling as HTMLInputElement;
      subling.value = localStorage.getItem("query") as string;
    }
  });
  function activateOnFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    const previousSubling = target.previousElementSibling as HTMLButtonElement;
    sourceButtons.forEach((item) => {
      item.classList.remove("turnOn");
      item.classList.add("turnOff");
    });
    previousSubling.classList.remove("turnOff");
    previousSubling.classList.add("turnOn");
  }
  inputFlicker.addEventListener("focus", activateOnFocus);
  inputUsplash.addEventListener("focus", activateOnFocus);
  inputUsplash.addEventListener("blur", () => {
    if (inputUsplash.value === "") {
      localStorage.setItem("source", "GitHub");
      return;
    }
    localStorage.setItem("source", "Unsplash");
    localStorage.setItem("query", inputUsplash.value);
  });
  inputFlicker.addEventListener("blur", () => {
    if (inputFlicker.value === "") {
      localStorage.setItem("source", "GitHub");
      return;
    }
    localStorage.setItem("source", "Flicker");
    localStorage.setItem("query", inputFlicker.value);
  });
  sourceButtons.forEach((item) => item.addEventListener("click", toggle));
}

onlyOneSource();

const settings = () => {
  const codeWheel: any = document.querySelector(".settings");
  const settingsContainer = document.querySelector(
    ".settings-container-wrapper"
  );

  const container: any = document.querySelector("._container");

  function showSettingsWindow(event: any) {
    if (
      codeWheel &&
      event.target === codeWheel &&
      !settingsContainer?.classList.contains("toggle")
    ) {
      settingsContainer?.classList.add("toggle");
      return;
    }
    if (
      event.target === codeWheel &&
      settingsContainer?.classList.contains("toggle")
    ) {
      settingsContainer?.classList.remove("toggle");
    }
    if (
      event.target.classList.contains("on") ||
      event.target.classList.contains("off") ||
      event.target.classList.contains("en") ||
      event.target.classList.contains("ru")
    )
      return;
    if (
      event.target.closest(".settings-container-wrapper") !== settingsContainer
    ) {
      settingsContainer?.classList.remove("toggle");
    }
  }
  settingsContainer?.addEventListener("click", showSettingsWindow);
  codeWheel.addEventListener("click", showSettingsWindow);
  container.addEventListener("click", () =>
    settingsContainer?.classList.remove("toggle")
  );
  document
    .querySelector(".qutotes-day")
    ?.addEventListener("click", () =>
      settingsContainer?.classList.remove("toggle")
    );
};
settings();

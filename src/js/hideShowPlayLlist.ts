import toggle from "./utulyties";
import { OpacityValues } from "./enums";
function hideShowPlayLlist() {
  const playlist = Array.from(
    document.querySelectorAll<HTMLDivElement>(".header-audio-player__playList")
  );

  const playlistButtonOn = document.querySelector(
    ".settings-container__playlist > button.on"
  ) as HTMLButtonElement;
  const playlistButtonOff = document.querySelector(
    ".settings-container__playlist > button.off"
  ) as HTMLButtonElement;
  toggle(playlist, playlistButtonOn, playlistButtonOff, "PlayList");
  window.addEventListener("DOMContentLoaded", () => {
    playlist.forEach(
      (item) =>
        (item.style.opacity = `${localStorage.getItem("opacityPlayList")}`)
    );
    toggle(playlist, playlistButtonOn, playlistButtonOff, "PlayList");
    if (localStorage.getItem("opacityPlayList") === OpacityValues.On) {
      playlistButtonOn?.classList.add("turnOn");
      playlistButtonOff?.classList.add("turnOff");
      playlist.forEach((item) => (item.style.visibility = ""));
    }
    if (localStorage.getItem("opacityPlayList") === OpacityValues.Off) {
      playlistButtonOn?.classList.add("turnOff");
      playlistButtonOff?.classList.add("turnOn");
      playlist.forEach((item) => (item.style.visibility = "hidden"));
    }
  });
  playlistButtonOn?.addEventListener("click", () =>
    toggle(playlist, playlistButtonOn, playlistButtonOff, "PlayList")
  );
  playlistButtonOff?.addEventListener("click", () =>
    toggle(playlist, playlistButtonOn, playlistButtonOff, "PlayList")
  );
}

hideShowPlayLlist();

const audio = document.querySelector(".audio_player") as HTMLAudioElement;
const playButton = document.querySelector(
  ".header-audio-player__buttonPlay"
) as HTMLButtonElement;
const audioContainer: any = document.querySelector(".header-audio-player");
const previousButton = document.querySelector(
  ".header-audio-player__buttonPrev"
);
const nextButton = document.querySelector(".header-audio-player__buttonNext");
const playButtonSmall = document.querySelectorAll<HTMLButtonElement>(
  ".header-audio-player__playSmall"
);
const songs = document.querySelectorAll<HTMLDivElement>(
  ".header-audio-player__SongName"
);
const linearGradient = document.querySelector(
  ".linearGradient"
) as HTMLDivElement;
const sound = document.querySelector(".sound") as HTMLButtonElement;
const progressBar = document.querySelector(".progressBar") as HTMLDivElement;
const currentMinutes = document.querySelector(
  ".currentMinute"
) as HTMLSpanElement;
const currentSeconds = document.querySelector(
  ".currentSecond"
) as HTMLSpanElement;
const totalSeconds = document.querySelector(".TotalSeconds") as HTMLSpanElement;
const totalMinutes = document.querySelector(".TotalMinute") as HTMLSpanElement;
const trackName = document.querySelector(
  ".header-audio-player__songName"
) as HTMLDivElement;
const soundBar = document.querySelector(".soundBar") as HTMLInputElement;
let currentTrack = 0;

//!Functions

function changeSoundButtonClassOnKeyboard(event: KeyboardEvent) {
  if ("code" in event) {
    if (sound?.classList.contains("mute") && event.code === "KeyM") {
      sound?.classList.remove("mute");
      sound?.classList.add("sound");
      audio.muted = false;
      soundBar.value = `${audio.volume * 100}`;

      return;
    }
    if (sound?.classList.contains("sound") && event.code === "KeyM") {
      sound?.classList.remove("sound");
      sound?.classList.add("mute");
      soundBar.value = "0";
      audio.muted = true;
      console.log(2);
      return;
    }
  }
}
function changeSoundButtonClassOnClick() {
  if (sound?.classList.contains("mute")) {
    sound?.classList.remove("mute");
    sound?.classList.add("sound");
    audio.muted = false;
    soundBar.value = `${audio.volume * 100}`;

    return;
  }
  if (sound?.classList.contains("sound")) {
    sound?.classList.remove("sound");
    sound?.classList.add("mute");
    soundBar.value = "0";
    audio.muted = true;

    return;
  }
}
function changeSoundButtonClassOnSoundChange() {
  if (!audio.volume) {
    sound?.classList.remove("sound");
    sound?.classList.add("mute");
  } else {
    sound?.classList.remove("mute");
    sound?.classList.add("sound");
  }
}

function changeVolume() {
  audio.volume = +soundBar.value / 100;
}

function showCurrentTime() {
  let curentTime = audio.currentTime;
  let currentMinute = Math.floor(curentTime / 60);
  let currentSecond = Math.floor(curentTime - 60 * currentMinute);
  currentMinute < 10
    ? (currentMinutes.innerHTML = "0" + `${currentMinute}`)
    : (currentMinutes.innerHTML = `${currentMinute}`);
  currentSecond < 10
    ? (currentSeconds.innerHTML = "0" + `${currentSecond}`)
    : (currentSeconds.innerHTML = `${currentSecond}`);
}
function showTotalDuration() {
  const totalDuration = audio.duration;
  let minutesTotalDuration = Math.floor(totalDuration / 60);
  let seconds = Math.floor(totalDuration - 60 * minutesTotalDuration);
  if (minutesTotalDuration < 10) {
    totalMinutes.innerHTML = "0" + `${minutesTotalDuration}`;
  }
  if (minutesTotalDuration >= 10) {
    totalMinutes.innerHTML = `${minutesTotalDuration}`;
  }
  if (seconds < 10) {
    totalSeconds.innerHTML = "0" + `${seconds}`;
  }
  if (seconds >= 10) {
    totalSeconds.innerHTML = `${seconds}`;
  }
}
function changeCurrentTimeWithMouse(event: MouseEvent) {
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}
function showProgress() {
  let percent = (audio.currentTime / audio.duration) * 100;
  linearGradient.style.width = `${percent}%`;
}
function isPaused() {
  audio.paused ? audio.play() : audio.pause();
}

function PlayOnButton(event: MouseEvent) {
  if (event.target !== playButton) return;
  isPaused();
}

function showCurrentTrackName() {
  trackName.textContent = `${songs[currentTrack].textContent}`;
}

function changeCurrentSongOnListClick(event: MouseEvent) {
  const target = event.target as HTMLDivElement;
  if (!target.classList.contains("header-audio-player__SongName")) {
    return;
  }
  const arrayFromSongs = Array.from(songs);
  const eventTargetIndex: number = arrayFromSongs.indexOf(target);
  playButtonSmall[currentTrack].classList.remove(
    "header-audio-player__pauseSmall"
  );
  console.log(audio.paused);
  playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall");
  currentTrack = eventTargetIndex;
  const { src, type } = playList[currentTrack];
  audio.setAttribute("src", src);
  audio.setAttribute("type", type);
  changeClassOnClick();
  isPaused();
}
function changeCurrentSongOnButtonOlaySmallClick(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (
    !(
      target.classList.contains("header-audio-player__playSmall") ||
      target.classList.contains("header-audio-player__pauseSmall")
    )
  ) {
    return;
  }
  const arrayFromButtons = Array.from(playButtonSmall);
  const eventTargetIndex: number = arrayFromButtons.indexOf(target);
  playButtonSmall[currentTrack].classList.remove(
    "header-audio-player__pauseSmall"
  );

  playButtonSmall[currentTrack].classList.add("header-audio-player__playSmall");
  currentTrack = eventTargetIndex;
  const { src, type } = playList[currentTrack];
  audio.setAttribute("src", src);
  audio.setAttribute("type", type);
}
function playPauseOnPlaySmall(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;

  if (
    !(
      target.classList.contains("header-audio-player__playSmall") ||
      target.classList.contains("header-audio-player__pauseSmall")
    )
  ) {
    return;
  }
  isPaused();
}
function changeClassOnClick() {
  if (audio.paused) {
    playButton?.classList.remove("header-audio-player__buttonPlay");
    playButton?.classList.add("header-audio-player__buttonPause");
    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__playSmall"
    );

    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__pauseSmall"
    );
  } else {
    playButton?.classList.remove("header-audio-player__buttonPause");
    playButton?.classList.add("header-audio-player__buttonPlay");
    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__playSmall"
    );

    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__pauseSmall"
    );
  }
}

const playList = [
  {
    src: "./assets/Aqua.mp3",
    type: "type='audio/mpeg'",
  },
  {
    src: "./assets/Morricone.mp3",
    type: "type='audio/mpeg'",
  },
  {
    src: "./assets/You.mp3",
    type: "type='audio/mpeg'",
  },
  {
    src: "./assets/Wind.mp3",
    type: "type='audio/mpeg'",
  },
];
function nextTrack(event: any) {
  if (event?.target !== nextButton) return;
  if (currentTrack === 3) {
    currentTrack = 0;
    playButtonSmall[3].classList.remove("header-audio-player__pauseSmall");
    playButtonSmall[3].classList.add("header-audio-player__playSmall");
    playButtonSmall[0].classList.add("header-audio-player__pauseSmall");
    const { src, type } = playList[currentTrack];
    audio.setAttribute("src", `${src}`);
    audio.setAttribute("type", `${type}`);

    isPaused();

    return;
  }
  currentTrack++;
  playButtonSmall[currentTrack - 1].classList.remove(
    "header-audio-player__pauseSmall"
  );
  playButtonSmall[currentTrack - 1].classList.add(
    "header-audio-player__playSmall"
  );
  playButtonSmall[currentTrack].classList.add(
    "header-audio-player__pauseSmall"
  );
  const { src, type } = playList[currentTrack];
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type", `${type}`);
  isPaused();
}
function playAfterEnd() {
  if (currentTrack === 3) {
    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__pauseSmall"
    );
    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__playSmall"
    );
    currentTrack = 0;
    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__playSmall"
    );
    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__pauseSmall"
    );
    const { src, type } = playList[currentTrack];
    audio.setAttribute("src", src);
    audio.setAttribute("type", type);
    isPaused();
  } else {
    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__pauseSmall"
    );
    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__playSmall"
    );
    currentTrack++;
    playButtonSmall[currentTrack].classList.remove(
      "header-audio-player__playSmall"
    );
    playButtonSmall[currentTrack].classList.add(
      "header-audio-player__pauseSmall"
    );
    const { src, type } = playList[currentTrack];
    audio.setAttribute("src", src);
    audio.setAttribute("type", type);
    isPaused();
  }
}
function previousTrack(event: any) {
  if (event?.target !== previousButton) return;
  if (currentTrack === 0) {
    currentTrack = 3;
    playButtonSmall[0].classList.remove("header-audio-player__pauseSmall");
    playButtonSmall[0].classList.add("header-audio-player__playSmall");
    playButtonSmall[3].classList.add("header-audio-player__pauseSmall");
    const { src, type } = playList[currentTrack];
    audio.setAttribute("src", `${src}`);
    audio.setAttribute("type", `${type}`);
    isPaused();

    return;
  }
  currentTrack--;
  playButtonSmall[currentTrack + 1].classList.remove(
    "header-audio-player__pauseSmall"
  );
  playButtonSmall[currentTrack + 1].classList.add(
    "header-audio-player__playSmall"
  );
  playButtonSmall[currentTrack].classList.add(
    "header-audio-player__pauseSmall"
  );
  const { src, type } = playList[currentTrack];
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type", `${type}`);
  isPaused();
}
window.addEventListener("DOMContentLoaded", () => {
  const { src, type } = playList[0];
  audio.setAttribute("src", `${src}`);
  audio.setAttribute("type", `${type}`);
});
//!===========Events

playButtonSmall.forEach((item) =>
  item.addEventListener("click", (event) => {
    changeCurrentSongOnButtonOlaySmallClick(event);
    changeClassOnClick();
    playPauseOnPlaySmall(event);
  })
);
songs.forEach((item) =>
  item.addEventListener("click", changeCurrentSongOnListClick)
);
playButton?.addEventListener("click", changeClassOnClick);
audioContainer.addEventListener("click", function (event: any) {
  PlayOnButton(event);
});
audio.addEventListener("play", () => {
  showCurrentTrackName();
  showTotalDuration();
});
audio.addEventListener("timeupdate", () => {
  showProgress();
  showCurrentTime();
  showTotalDuration();
});
previousButton?.addEventListener("click", previousTrack);
nextButton?.addEventListener("click", nextTrack);
audio.addEventListener("ended", playAfterEnd);
progressBar.addEventListener("click", changeCurrentTimeWithMouse);
progressBar.addEventListener("mousedown", () => {
  progressBar.addEventListener("mousemove", changeCurrentTimeWithMouse);
  document.addEventListener("mouseup", () =>
    progressBar.removeEventListener("mousemove", changeCurrentTimeWithMouse)
  );
});
soundBar.addEventListener("mousedown", () => {
  soundBar.addEventListener("mousemove", function () {
    changeVolume();
    changeSoundButtonClassOnSoundChange();
  });
  document.addEventListener("mouseup", () =>
    soundBar.removeEventListener("mousemove", changeVolume)
  );
});
soundBar.addEventListener("click", () => {
  changeVolume();
  changeSoundButtonClassOnSoundChange();
});
document.addEventListener("DOMContentLoaded", () => (audio.volume = 0.3));
sound.addEventListener("click", changeSoundButtonClassOnClick);
document.addEventListener("keydown", changeSoundButtonClassOnKeyboard);

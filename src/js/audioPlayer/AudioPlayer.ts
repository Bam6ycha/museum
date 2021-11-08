import { Button } from "../buttons/Button";
import { Container } from "../Container";
import { RangeInput } from "../inputs/Range";
import { NumberOrRangeInputParameters } from "../inputs/types";
import { playList } from "../playlist";

const rangeInputData: NumberOrRangeInputParameters = {
  max: "1",

  min: "0",

  value: "0.3",

  step: "0.1"
};
class AudioPlayer {
  public element: HTMLDivElement;

  private container: Container;

  private audio: HTMLAudioElement;

  private soundBigButton: Button;

  private soundSmallButton: Button;

  private volume: RangeInput;

  private soundBarContainer: Container;

  private volumeButtonContainer: Container;

  constructor() {
    this.audio = this.createAudioElement();
    this.soundBigButton = new Button("volume");
    this.soundSmallButton = new Button("volume-small");
    this.volume = new RangeInput(rangeInputData);
    this.soundBarContainer = new Container("settings-main__soundBar", [
      this.soundSmallButton.element,
      this.volume.element
    ]);

    this.volumeButtonContainer = new Container(
      "settings-main__volumeButtonContainer",
      [this.soundBigButton.element]
    );
    this.container = new Container("settings-main__player", [
      this.audio,
      this.volumeButtonContainer.element,
      this.soundBarContainer.element
    ]);
    this.element = this.container.element;
    this.audio.volume = 0.3;
  }

  changeClassFromUnmuteToMute() {
    this.soundBigButton
      .removeClassFromButtonElement("volume")
      .addClassToButtonElement("mute");
    this.soundSmallButton
      .removeClassFromButtonElement("volume-small")
      .addClassToButtonElement("mute-small");
    return this;
  }

  changeClassFromMuteToUnmute() {
    this.soundBigButton
      .removeClassFromButtonElement("mute")
      .addClassToButtonElement("volume");
    this.soundSmallButton
      .removeClassFromButtonElement("mute-small")
      .addClassToButtonElement("volume-small");
    return this;
  }

  checkVolume() {
    this.volume.onChange(() => {
      const [source, type] = playList.correct;
      this.setSourceAndType(source, type);
      this.togglePlay();
    });
  }

  createAudioElement() {
    return document.createElement("audio");
  }

  isMute() {
    return this.audio.muted;
  }

  isPaused() {
    return this.audio.paused;
  }

  getVolume() {
    return this.audio.volume;
  }

  getCurrentSource() {
    return this.audio.getAttribute("src");
  }

  setSourceAndType(src: string, type: string) {
    this.audio.setAttribute("src", src);
    this.audio.setAttribute("type", type);
    return this;
  }

  setVolumeOnChange() {
    this.volume.onChange(() => {
      this.audio.volume = +this.volume.value;
      localStorage.setItem("volume", `${this.getVolume()}`);
      localStorage.setItem("isMuted", `${this.isMute()}`);

      if (
        this.getVolume() === 0 &&
        this.soundBigButton.isContainsClass("volume")
      ) {
        this.changeClassFromUnmuteToMute();
        this.toggleSound();
        return this;
      }

      if (
        this.getVolume() !== 0 &&
        this.soundBigButton.isContainsClass("mute")
      ) {
        this.changeClassFromMuteToUnmute();
        this.toggleSound();

        return this;
      }

      return this;
    });
  }

  togglePlay() {
    if (this.isPaused()) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  toggleSound() {
    if (this.isMute()) {
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
    }
  }

  setVolumeOnDomLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      const volume = localStorage.getItem("volume") ?? "0.3";
      if (volume === "0") {
        this.changeClassFromUnmuteToMute();
      } else {
        this.audio.volume = +volume;
        this.volume.element.value = volume;
        this.changeClassFromMuteToUnmute();
      }
      const mute = localStorage.getItem("isMuted") ?? "false";

      if (mute[0] === "f") {
        this.audio.muted = false;
      } else {
        this.audio.muted = true;
      }
    });
  }

  soundOffOnClick() {
    this.soundBigButton.OnClick(() => {
      if (this.soundBigButton.isContainsClass("volume")) {
        this.changeClassFromUnmuteToMute();
        this.volume.element.value = "0";
        this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      } else {
        this.changeClassFromMuteToUnmute();
        this.volume.element.value = `${this.getVolume()}`;
        this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      }
    });
  }
}

const player = new AudioPlayer();

export { player };

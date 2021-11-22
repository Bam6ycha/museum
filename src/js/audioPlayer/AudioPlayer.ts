import { Button } from "../buttons/Button";
import { Container } from "../Container/Container";
import { RangeInput } from "../inputs/Range";
import { NumberOrRangeInputParameters } from "../inputs/types";

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

  private playlist: {
    correct: string[];
    incorrect: string[];
    roundEnd: string[];
  };

  constructor() {
    this.playlist = {
      correct: ["./img/correct.ab6b7b7ffdaa59928ae3.mp3", "audio/mpeg"],
      incorrect: ["./img/incorrect.638656cc44617dffb1a3.mp3", "audio/mpeg"],
      roundEnd: ["./img/roundEnd.6e5fae08c94a8d6f784b.mp3", "audio/mpeg"]
    };
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
    this.audio.crossOrigin = "anonymous";
    this.audio.volume = 0.3;
    this.volume.setValue("0.3");

    this.soundOffOnClick();
    this.setVolumeOnChange();
    this.checkVolume();
    this.setVolumeOnDomLoad();
  }

  showMuteButton() {
    this.soundBigButton
      .removeClassFromButtonElement("volume")
      .addClassToButtonElement("mute");
    this.soundSmallButton
      .removeClassFromButtonElement("volume-small")
      .addClassToButtonElement("mute-small");
    return this;
  }

  showUnmuteButton() {
    this.soundBigButton
      .removeClassFromButtonElement("mute")
      .addClassToButtonElement("volume");
    this.soundSmallButton
      .removeClassFromButtonElement("mute-small")
      .addClassToButtonElement("volume-small");
    return this;
  }

  checkVolume() {
    this.volume.onChange(async () => {
      await this.playCorrect();
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

  public returnDefaults() {
    this.audio.volume = 0.3;
    this.volume.setValue("0.3");
    this.showUnmuteButton();
    this.audio.muted = false;
    localStorage.setItem("isMuted", "false");
  }

  public getCurrentSource() {
    return this.audio.getAttribute("src");
  }

  public async playCorrect() {
    const [source, type] = this.playlist.correct;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    this.audio.load();
    await this.togglePlay();
    return this;
  }

  public async incorrectAnswerSound() {
    const [source, type] = this.playlist.incorrect;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    await this.togglePlay();
    return this;
  }

  public async playEndRound() {
    const [source, type] = this.playlist.roundEnd;
    this.audio.setAttribute("src", source);
    this.audio.setAttribute("type", type);
    await this.togglePlay();
    return this;
  }

  private setVolumeOnChange() {
    this.volume.onChange(async () => {
      this.audio.volume = +this.volume.value;
      localStorage.setItem("volume", `${this.getVolume()}`);
      localStorage.setItem("isMuted", `${this.isMute()}`);

      if (
        this.getVolume() === 0 &&
        this.soundBigButton.isContainsClass("volume")
      ) {
        await this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
        this.showMuteButton();
        return this;
      }

      if (
        this.getVolume() !== 0 &&
        this.soundBigButton.isContainsClass("mute")
      ) {
        this.audio.muted = false;
        localStorage.setItem("isMuted", `${this.isMute()}`);

        this.showUnmuteButton();
      }
      return this;
    });
  }

  private setVolumeOnDomLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      const volume = localStorage.getItem("volume") ?? "0.3";
      const mute = localStorage.getItem("isMuted") ?? "false";
      if (mute === "true") {
        this.showMuteButton();
        this.volume.setValue("0");
        this.audio.muted = true;
      } else {
        this.audio.volume = +volume;
        this.volume.element.value = volume;
        this.showUnmuteButton();
        this.audio.muted = false;
      }
    });
  }

  private soundOffOnClick() {
    this.soundBigButton.OnClick(async () => {
      if (this.soundBigButton.isContainsClass("volume")) {
        this.showMuteButton();
        this.volume.element.value = "0";
        await this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      } else {
        this.showUnmuteButton();
        this.volume.element.value = `${this.getVolume()}`;
        await this.toggleSound();
        localStorage.setItem("isMuted", `${this.isMute()}`);
      }
    });
  }

  public async togglePlay() {
    try {
      if (this.isPaused()) {
        this.audio.pause();
        await this.audio.play();
      } else {
        this.audio.pause();
      }
    } catch (err) {
      throw new Error("OKAY(");
    }
  }

  private toggleSound() {
    if (this.isMute()) {
      this.audio.muted = false;
    } else {
      this.audio.muted = true;
    }
  }
}

const player = new AudioPlayer();

export { player };

import { player } from "../audioPlayer/AudioPlayer";
import { Container } from "../Container/Container";

export class Volume {
  public element: HTMLDivElement;

  audioplayer: HTMLDivElement;

  private volume: Container;

  private volumeDescription: Container;

  constructor() {
    this.audioplayer = player.element;
    this.volumeDescription = new Container("settings-main__VolumeDescription")
      .addClassName("settings-main__VolumeDescription_cherryCappytalize")
      .setText("VOLUME");

    this.volume = new Container("settings-main__volume", [
      this.audioplayer,
      this.volumeDescription.element
    ]);

    this.element = this.volume.element;
  }

  public returnDefaults() {
    player.returnDefaults();
  }
}

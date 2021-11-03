import { ButtonWithText } from "./ButtonWithText";
import { ButtonWithImg } from "./ButtonWithImg";
import { Container } from "./Container";
import { Input } from "./Input";
import { insert } from "./Insert";
function createSettingsPage() {
  const settingsPageContainer = new Container("settings");
  settingsPageContainer.addClassName("from-left");
  document.body.append(settingsPageContainer.element);
  const settingsPageHeader = new Container("settings-header");
  insert.prepend(settingsPageHeader.element);
  const settingHeaderWrapper = new Container("settings-header__wrapper");
  insert.prepend(settingHeaderWrapper.element);
  const settingsHeaderLogo = new Container("settings-header__logo");
  settingsHeaderLogo.setBackgroundImg("../assets/logo.jpg");
  insert.prepend(settingsHeaderLogo.element);
  const mainContainer = new Container("settings-main");
  insert.append(mainContainer.element);
  const settingsMainVolume = new Container("settings-main__volume");
  insert.prepend(settingsMainVolume.element);
  const settingsMainVolumeButtonContainer = new Container(
    "settings-main__volumeButtonContainer"
  );
  insert.prepend(settingsMainVolumeButtonContainer.element);
  const volumeBigButton = new ButtonWithImg(
    "../assets/volume-on.svg",
    "volume"
  );
  insert.append(volumeBigButton.element);

  const settingVolumeBarContainer = new Container("settings-main__soundBar");
  insert.append(settingVolumeBarContainer.element);
  const volumeSmallButton = new ButtonWithImg(
    "../assets/volume-off.svg",
    "volume-small"
  );
  insert.prepend(volumeSmallButton.element);
  const settingSoundBar = new Input("0", "100", "30", "0.1", "type", "range");
  insert.append(settingSoundBar.element);
  const settingsMainDescription = new Container(
    "settings-main__VolumeDescription"
  );
  insert.append(settingsMainDescription.element);
  settingsMainDescription.setText("VOLUME");
  settingsMainDescription.addClassName(
    "settings-main__VolumeDescription_cherryCappytalize"
  );

  const settingsMainTimer = new Container("settings-main__Timer");
  insert.append(settingsMainTimer.element);
  const settingsMainClockContainer = new Container(
    "settings-main__ClockContainer"
  );
  insert.prepend(settingsMainClockContainer.element);
  const timerButton = new ButtonWithImg(
    "../assets/timer-picture.svg",
    "settings-clock"
  );
  insert.append(timerButton.element);
  const checkbox = new Input("", "", "", "", "type", "checkbox");
  insert.append(checkbox.element);
  const checkboxDescription = new Container(
    "settings-main__checkBoxDescription"
  );
  checkboxDescription.addClassName(
    "settings-main__checkBoxDescription_cherrySmall"
  );
  checkboxDescription.setText("ON/OFF");
  insert.append(checkboxDescription.element);
  const mainSettingsTimerDescription = new Container(
    "settings-main__TimerDescription_cherryCappytalize"
  );
  mainSettingsTimerDescription.setText("TIME GAME");
  insert.append(mainSettingsTimerDescription.element);
}

export { createSettingsPage };

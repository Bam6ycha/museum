import { Button } from "./Button";

import { ButtonWithText } from "./ButtonWithText";

import { Container } from "./Container";

import { checkbox, settingSoundBar, timerSteps } from "./Input";

function createSettingsPage() {
  const settingsPageContainer = new Container("settings");
  document.body.append(settingsPageContainer.element);
  settingsPageContainer.addClassName("hidden");
  const settingsPageHeader = new Container("settings-header");
  settingsPageContainer.prepend(settingsPageHeader.element);

  const settingHeaderWrapper = new Container("settings-header__wrapper");
  settingsPageHeader.prepend(settingHeaderWrapper.element);

  const settingsHeaderLogo = new Container("settings-header__logo");
  settingsHeaderLogo.setBackgroundImg("../assets/logo.jpg");
  settingHeaderWrapper.prepend(settingsHeaderLogo.element);

  const headerDescription = new Container("settings-header__description");
  settingHeaderWrapper.append(headerDescription.element);
  headerDescription.setText("SETTINGS");
  headerDescription.addClassName("settings-header__description");

  const mainContainer = new Container("settings-main");
  settingsPageContainer.append(mainContainer.element);

  const settingsMainVolume = new Container("settings-main__volume");
  mainContainer.prepend(settingsMainVolume.element);

  const settingsMainVolumeButtonContainer = new Container(
    "settings-main__volumeButtonContainer"
  );
  settingsMainVolume.prepend(settingsMainVolumeButtonContainer.element);
  const volumeBigButton = new Button("volume");
  settingsMainVolumeButtonContainer.append(volumeBigButton.element);

  const settingVolumeBarContainer = new Container("settings-main__soundBar");
  settingsMainVolume.append(settingVolumeBarContainer.element);
  const volumeSmallButton = new Button("volume-small");

  settingVolumeBarContainer.prepend(volumeSmallButton.element);
  const soundBar = settingSoundBar.element;

  settingVolumeBarContainer.append(soundBar);
  settingSoundBar.addClass("soundBar");
  const settingsMainDescription = new Container(
    "settings-main__VolumeDescription"
  );
  settingsMainVolume.append(settingsMainDescription.element);
  settingsMainDescription.setText("VOLUME");
  settingsMainDescription.addClassName(
    "settings-main__VolumeDescription_cherryCappytalize"
  );

  const settingsMainTimer = new Container("settings-main__Timer");
  mainContainer.append(settingsMainTimer.element);
  const settingsMainClockContainer = new Container(
    "settings-main__ClockContainer"
  );
  settingsMainTimer.prepend(settingsMainClockContainer.element);
  const timerButton = new Button("settings-clock");
  settingsMainClockContainer.prepend(timerButton.element);
  const checkboxContainer = new Container("settings-main__checkboxContainer");
  settingsMainTimer.append(checkboxContainer.element);
  const timer = timerSteps.element;
  checkboxContainer.append(timer);
  timerSteps.addClass("settings-main__timer");
  timerSteps.addClass("invisible");
  checkboxContainer.prepend(checkbox.element);

  const checkboxDescription = new Container(
    "settings-main__checkBoxDescription"
  );
  checkboxDescription.addClassName(
    "settings-main__checkBoxDescription_cherrySmall"
  );
  checkboxDescription.setText("ON/OFF");
  checkboxContainer.append(checkboxDescription.element);

  const mainSettingsTimerDescription = new Container(
    "settings-main__TimerDescription_cherryCappytalize"
  );
  mainSettingsTimerDescription.setText("TIME GAME");
  settingsMainTimer.append(mainSettingsTimerDescription.element);

  const footer = new Container("settings-footer");
  settingsPageContainer.append(footer.element);

  const footerSettingsSaveButton = new ButtonWithText(
    "settings-footer__cherryButton",
    "SAVE"
  );
  footer.prepend(footerSettingsSaveButton.element);

  const footerSettingsDefaultButton = new ButtonWithText(
    "settings-footer__cherryButton",
    "DEFAULTS"
  );
  footer.append(footerSettingsDefaultButton.element);
}

export { createSettingsPage };

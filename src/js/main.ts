import "../scss/main.scss";
import "../index.html";

import getDayOfTheWeek, { electronicClock, setMonth } from "./electronic-clock";
setInterval(electronicClock, 1000);

getDayOfTheWeek();

setMonth();
import { setDate } from "./electronic-clock";
setDate();
import { greetings } from "./electronic-clock";
greetings();
import "../js/slider_fetch";
import "../js/quotes";
import "../js/saveName";
import "../js/creatAudioPlayer";
import "../js/weather";
import "../js/settings";
import "../js/toggleButtons";
import "../js/hideShowDeluxPlayer";
import "../js/hideShowPlayLlist";
import "../js/hideShowHeaderWeather";
import "../js/showHideTime";
import "../js/showHideDate";
import "../js/showHideGreetings";
import "../js/showHideQuotes";
import "../js/changeLaguage";
import "../js/translateSettings";

function electronicClock(
  hoursText: any,
  minutesText: any,
  secondsText: any
): void {
  let date = new Date();
  hoursText = document.querySelector(".current-time__hours");
  minutesText = document.querySelector(".current-time__minutes");
  secondsText = document.querySelector(".current-time__seconds");
  let hours: number = date.getHours();
  let minutes: number = date.getMinutes();
  let seconds: number = date.getSeconds();
  if (hours < 10) {
    hoursText.innerHTML = "0" + `${hours}`;
  }
  if (hours >= 10) {
    hoursText.innerHTML = `${hours}`;
  }
  if (minutes < 10) {
    minutesText.innerHTML = "0" + `${minutes}`;
  }
  if (minutes >= 10) {
    minutesText.innerHTML = `${minutes}`;
  }
  if (seconds < 10) {
    secondsText.innerHTML = "0" + `${seconds}`;
  }
  if (seconds >= 10) {
    secondsText.innerHTML = `${seconds}`;
  }
}
export { electronicClock };

const language = localStorage.getItem("language");
export default function getDayOfTheWeek(): void {
  let day: number = new Date().getDay();
  let currentDayDependsOnLanguage;
  const currentDay: any = document.querySelector(".current-date__day");
  const dayOfTheWeekRu: Array<string> = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const dayOfTheWeek: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  language === "ru"
    ? (currentDayDependsOnLanguage = dayOfTheWeekRu)
    : (currentDayDependsOnLanguage = dayOfTheWeek);
  for (let i: number = 0; i < currentDayDependsOnLanguage.length; i++) {
    if (i === day) {
      currentDay.innerHTML = `${currentDayDependsOnLanguage[i]},`;
    }
  }
}
const monthListRu = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Авгус",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const monthListEn = [
  "January ",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function setMonth(): void {
  const currentMonth = document.querySelector(
    ".current-date__month"
  ) as HTMLDivElement;
  const month: number = new Date().getMonth();
  const currentMonthList = language === "ru" ? monthListRu : monthListEn;

  currentMonth.innerHTML = currentMonthList[month];
}
export { setMonth };
export function setDate(): void {
  const date: number = new Date().getDate();
  const currentDate: any = document.querySelector(".current-date__date");
  currentDate.innerHTML = `${date}`;
}
const englishDictionary = {
  "0": "Good morning,",
  "1": "Good afternoon,",
  "2": "Good evening,",
  "3": "Good night,",
};
const russianDictionary = {
  "0": "Доброе утро,",
  "1": "Добрый день,",
  "2": "Добрый вечер,",
  "3": "Доброй ночи,",
};

export function greetings(): void {
  const dictionary = language === "ru" ? russianDictionary : englishDictionary;
  const greetinsText: any = document.querySelector(".greetingsText");
  const currentHour: number = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    greetinsText.innerHTML = dictionary["0"];
  }
  if (currentHour >= 12 && currentHour < 18) {
    greetinsText.innerHTML = dictionary["1"];
  }
  if (currentHour >= 18 && currentHour < 24) {
    greetinsText.innerHTML = dictionary["2"];
  }
  if (currentHour >= 0 && currentHour < 6) {
    greetinsText.innerHTML = dictionary["3"];
  }
}

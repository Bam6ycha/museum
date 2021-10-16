
 function electronicClock(hoursText:any,minutesText:any,secondsText:any) :void{
   let date = new Date();
   hoursText = document.querySelector(".current-time__hours");
   minutesText  = document.querySelector(".current-time__minutes");
   secondsText = document.querySelector(".current-time__seconds")
  let hours:number = date.getHours();
  let minutes : number = date.getMinutes();
  let seconds : number = date.getSeconds();
  if(hours<10){
    hoursText.innerHTML = "0" + `${hours}`
  }
  if(hours>=10){
    hoursText.innerHTML = `${hours}`
  }
  if(minutes<10){
    minutesText.innerHTML = "0" + `${minutes}`;
  }
  if(minutes>=10){
    minutesText.innerHTML = `${minutes}`;
  }
  if(seconds<10){
    secondsText.innerHTML = "0" + `${seconds}`;
  }
  if(seconds>=10){
    secondsText.innerHTML =`${seconds}`;
  }
}
export{electronicClock}


export default function getDayOfTheWeek():void{
  let day:number = new Date().getDay();
  
  const currentDay:any = document.querySelector(".current-date__day")
  let dayOfTheWeek:Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for(let i:number=0;i<dayOfTheWeek.length;i++){
    if(i===day){
      currentDay.innerHTML = `${dayOfTheWeek[i]},`;
    }
  }
}
 function getMonth ():void{
  const currentMonth:any = document.querySelector(".current-date__month")
    const month:number = new Date().getMonth()
  let monthList:Array<string> = [
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
  for(let i:number=0;i<monthList.length;i++){
    if(i===month){
      currentMonth.innerHTML =   `${monthList[i]}`;

    }
  }
}
export{getMonth};
 export function getDate():void{
  const date: number = new Date().getDate();
  const currentDate:any = document.querySelector(".current-date__date")
  currentDate.innerHTML = `${date}`
 }


 export function greetings():void{
  const greetinsText:any= document.querySelector('.timeOfday')
  const currentHour:number = new Date().getHours();
  if(currentHour>=6 && currentHour<12){
    greetinsText.innerHTML = "morning"
  }
  if(currentHour>=12 && currentHour<18){
    greetinsText.innerHTML = "day"
  }
  if(currentHour>=18 && currentHour<24){
    greetinsText.innerHTML = "evening"
  }
  if(currentHour>=0 && currentHour<6){
    greetinsText.innerHTML = "night"
  }
 }
const input:any = document.querySelector(".name")


function setUser(){
  const inputValue:string = input?.value;
  if(!inputValue) return
  localStorage.setItem("user",inputValue);
}


function getUser(){
  const value = localStorage.getItem("user")
  input.value = value;
}




input.addEventListener("blur",setUser);

document.addEventListener("DOMContentLoaded",getUser)
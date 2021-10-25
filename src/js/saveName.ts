const input = document.querySelector(".name") as HTMLInputElement;

const currentPlaceholder =
  localStorage.getItem("language") === "ru" ? "Введите имя" : "Enter name";
function setUser() {
  const inputValue: string = input.value;
  if (!inputValue) return;
  localStorage.setItem("user", inputValue);
}

function changePlaceholder() {
  input.placeholder = currentPlaceholder;
}

input.addEventListener("blur", setUser);

window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user") as string;
  input.value = user;
  changePlaceholder();
});

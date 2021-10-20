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
function getUser() {
  const value: string | null = localStorage.getItem("user");
  if (value === null) return;
  input.value = value;
}

input.addEventListener("blur", setUser);

document.addEventListener("DOMContentLoaded", () => {
  setUser();
  changePlaceholder();
});

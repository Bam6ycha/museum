const button: any = document.querySelector(".reload");

const quot: any = document.querySelector(".quote");
const autor: any = document.querySelector(".author");
const quoteLangugae: string =
  localStorage.getItem("language") === "ru" ? "ru" : "eng";

if (quoteLangugae === "eng") {
  async function getQuotes() {
    const response = await fetch("https://type.fit/api/quotes");
    const result = await response.json();
    const { text, author } = result[getRandomQuoteIndex(result.length - 1)];
    quot.innerHTML = '"' + `${text}` + '"';
    autor.innerHTML = `${author}`;
  }
  getQuotes();
  button.addEventListener("click", getQuotes);
}

if (quoteLangugae === "ru") {
  async function getQuotes() {
    const response = await fetch(
      "https://raw.githubusercontent.com/Bam6ycha/stage1-tasks/momentum/assets/fonts/quotes.json"
    );
    const result = await response.json();
    const { text, author } = result[getRandomQuoteIndex(result.length - 2)];
    quot.innerHTML = '"' + `${text}` + '"';
    autor.innerHTML = `${author}`;
  }
  getQuotes();
  button.addEventListener("click", getQuotes);
}
function getRandomQuoteIndex(maxQuoteIndex: number): number {
  const minQuoteIndex: number = 1;

  const randomPictureIndex = Math.ceil(
    minQuoteIndex - 0.5 + Math.random() * (maxQuoteIndex - minQuoteIndex + 1)
  );

  return randomPictureIndex;
}

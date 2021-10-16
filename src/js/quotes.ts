const button:any = document.querySelector('.reload')


const quot:any = document.querySelector(".quote")
const autor:any = document.querySelector(".author")

async function getQuotes(){
  const response = await fetch("https://type.fit/api/quotes");
  const result = await response.json();
  const {text,author} = result[getRandomQuoteIndex(result.length-1)];
  quot.innerHTML = '"' + `${text}` + '"'
  autor.innerHTML =`${author}`;
}

getQuotes()
function getRandomQuoteIndex(maxQuoteIndex:number):number{
  const minQuoteIndex:number = 1;
  
  const randomPictureIndex = (Math.ceil(minQuoteIndex - 0.5+Math.random() * (maxQuoteIndex - minQuoteIndex +1)))

  return randomPictureIndex
}

button.addEventListener("click", getQuotes);
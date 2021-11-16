class Utilites {
  constructor() {}

  public getRandomNumber(min: number, max: number) {
    const random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  }

  public async getAuthor(autorNumber: number) {
    const authorsUrl =
      "https://raw.githubusercontent.com/Bam6ycha/image-data/master/images.json";
    const response = await fetch(authorsUrl);
    const authors = await response.json();

    const description = authors[autorNumber];
    return description;
  }

  public creatURLImg(number: number) {
    const imgUrl = `https://raw.githubusercontent.com/Bam6ycha/image-data/master/img/${number}.jpg`;
    return imgUrl;
  }

  public async getImg(imgNumber: number) {
    const url = this.creatURLImg(imgNumber);
    const response = await fetch(url);
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imgUrl;
    return img;
  }

  public randomNumberGapArtistQuiz() {
    let min = 0;
    let max = 0;
    const categoryNumber = +(localStorage.getItem("ArtisQuizCategory") ?? "0");
    if (categoryNumber === 0) {
      min = 0;
      max = 9;
    }
    if (categoryNumber === 1) {
      min = 10;
      max = 19;
    }
    if (categoryNumber === 2) {
      min = 20;
      max = 29;
    }
    if (categoryNumber === 3) {
      min = 30;
      max = 39;
    }
    if (categoryNumber === 4) {
      min = 40;
      max = 49;
    }
    if (categoryNumber === 5) {
      min = 50;
      max = 59;
    }
    if (categoryNumber === 6) {
      min = 60;
      max = 69;
    }
    if (categoryNumber === 7) {
      min = 70;
      max = 79;
    }
    if (categoryNumber === 8) {
      min = 80;
      max = 89;
    }
    if (categoryNumber === 9) {
      min = 90;
      max = 99;
    }
    if (categoryNumber === 10) {
      min = 100;
      max = 109;
    }
    if (categoryNumber === 11) {
      min = 110;
      max = 119;
    }
    return [min, max];
  }

  public randomNumberGapPictureQuiz() {
    let min = 0;
    let max = 0;
    const categoryNumber = +(
      localStorage.getItem("PictureQuizCategory") ?? "0"
    );
    if (categoryNumber === 0) {
      min = 90;
      max = 99;
    }
    if (categoryNumber === 1) {
      min = 100;
      max = 109;
    }
    if (categoryNumber === 2) {
      min = 110;
      max = 119;
    }
    if (categoryNumber === 3) {
      min = 120;
      max = 129;
    }
    if (categoryNumber === 4) {
      min = 130;
      max = 139;
    }
    if (categoryNumber === 5) {
      min = 140;
      max = 149;
    }
    if (categoryNumber === 6) {
      min = 150;
      max = 159;
    }
    if (categoryNumber === 7) {
      min = 160;
      max = 169;
    }
    if (categoryNumber === 8) {
      min = 170;
      max = 179;
    }
    if (categoryNumber === 9) {
      min = 180;
      max = 189;
    }
    if (categoryNumber === 10) {
      min = 190;
      max = 199;
    }
    if (categoryNumber === 11) {
      min = 80;
      max = 89;
    }
    return [min, max];
  }

  public shuffle(array: string[] | HTMLImageElement[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

const utilites = new Utilites();
export { utilites };

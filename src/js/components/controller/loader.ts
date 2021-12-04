import { getResponse } from "../interfaces/getRespons";
import { BaseOptions, CustomOptions } from "../interfaces/options";
import { NewsResponse } from "../interfaces/response";

class Loader {
  baseLink: string;
  options: BaseOptions;
  constructor(baseLink: string, options: BaseOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: getResponse,
    callback = (data: NewsResponse) => {
      console.error("No callback for GET response");
    }
  ) {
    this.load("GET", endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      }
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: CustomOptions, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: (data: NewsResponse) => void,
    options: CustomOptions
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: NewsResponse) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;

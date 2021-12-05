import { ResponseStatus } from "../enums/responseStatus";
import { getResponse } from "../interfaces/getRespons";
import { LoaderInterface } from "../interfaces/loaderInterface";
import { BaseOptions, CustomOptions } from "../interfaces/options";
import { NewsResponse } from "../interfaces/response";

class Loader implements LoaderInterface {
  private baseLink: string;

  private options: BaseOptions;

  constructor(baseLink: string, options: BaseOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: getResponse,
    callback: (data: NewsResponse) => void = () => {
      console.error("No callback for GET response");
    }
  ) {
    this.load("GET", endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (
        res.status === ResponseStatus.Unauthorized ||
        res.status === ResponseStatus.NotFound
      ) {
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      }
      throw Error(res.statusText);
    }
    return res;
  }

  private makeUrl(options: CustomOptions, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
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

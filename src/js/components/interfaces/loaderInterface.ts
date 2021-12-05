import { getResponse } from "./getRespons";
import { NewsResponse } from "./response";

export interface LoaderInterface {
  getResp: (
    response: getResponse,
    callback: (data: NewsResponse) => void
  ) => void;
}

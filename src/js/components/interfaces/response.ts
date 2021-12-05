import { Article } from "./article";
import { Source } from "./source";

export interface NewsResponse {
  articles: Article[];
  sources: Source[];
}

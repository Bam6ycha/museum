import { Article } from "./article";
import { Source } from "./source";

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  sources: Source[];
}

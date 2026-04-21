import { ArticleInterface } from './Article.interface';

export interface GetFeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
  limit: number;
  currentPage: number;
}

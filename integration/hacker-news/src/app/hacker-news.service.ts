import { service } from '@joist/di';

export interface HackerNewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

export interface HackerNewsItemComment {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
}

export interface HackerNewsItemFull extends HackerNewsItem {
  comments: HackerNewsItemComment[];
}

@service()
export class HackerNewsService {
  getNews(): Promise<HackerNewsItem[]> {
    return fetch('https://api.hackerwebapp.com/news').then((res) => res.json());
  }

  getNewsItem(id: number): Promise<HackerNewsItemFull> {
    return fetch(`https://api.hackerwebapp.com/item/${id}`).then((res) => res.json());
  }
}

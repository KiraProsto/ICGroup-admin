export interface INewsItem {
  id: number;
  title: string;
  type: string;
  category: string;
  author: string;
  date: string;
  url: string;
  views: number;
}

export interface NewsFilters {
  action: string;
  type: string;
  category: string;
  date: string;
  search: string;
}

export interface NewsState {
  filters: NewsFilters;
  page: number;
  perPage: number;
  selectedIds: number[];
}

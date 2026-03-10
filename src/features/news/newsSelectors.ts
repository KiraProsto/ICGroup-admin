import type { RootState } from '@/app/store';
import type { INewsItem } from './newsTypes';

export const selectPage = (state: RootState) => state.news.page;
export const selectPerPage = (state: RootState) => state.news.perPage;
export const selectSelectedIds = (state: RootState) => state.news.selectedIds;

export const selectPageItems = (state: RootState, allNews: INewsItem[]) => {
  const page = state.news.page;
  const perPage = state.news.perPage;

  return allNews.slice((page - 1) * perPage, page * perPage);
};

export const selectTotalPages = (state: RootState, allNews: INewsItem[]) => {
  return Math.ceil(allNews.length / state.news.perPage);
};

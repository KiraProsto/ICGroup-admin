import { useAppDispatch, useAppSelector } from '@/app/hooks';

import NewsCounters from '@/components/news/NewsCounters';
import NewsHeader from '@/components/news/NewsHeader';
import NewsPagination from '@/components/news/NewsPagination';
import NewsTable from '@/components/news/NewsTable';
import { mockNews } from '@/components/news/NewsMockData';

import {
  selectPage,
  selectPerPage,
  selectSelectedIds,
  selectPageItems,
  selectTotalPages,
  selectFilteredNews,
} from '@/features/news/newsSelectors';

import {
  setPage,
  toggleSelectOne,
  toggleSelectAll,
} from '@/features/news/newsSlice';
import NewsFilters from '@/components/news/NewsFilters';

export default function NewsPage() {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const selectedIds = useAppSelector(selectSelectedIds);

  const items = useAppSelector((state) => state.news.items);

  const filtered = useAppSelector((state) => selectFilteredNews(state, items));

  const pageItems = useAppSelector((state) => selectPageItems(state, filtered));

  const allPages = useAppSelector((state) => selectTotalPages(state, filtered));

  const all = mockNews.length;
  const published = mockNews.filter((n) => n.type === 'Публичный').length;
  const drafts = mockNews.filter((n) => n.type === 'Черновик').length;

  const allIds = filtered.map((n) => n.id);

  return (
    <div className="admin__content">
      <NewsHeader />
      <NewsCounters all={all} published={published} drafts={drafts} />
      <NewsFilters />
      <NewsTable
        items={pageItems}
        allIds={allIds}
        selectedIds={selectedIds}
        onSelectOne={(id: number) => dispatch(toggleSelectOne(id))}
        onSelectAll={(ids: number[]) => dispatch(toggleSelectAll(ids))}
        perPage={perPage}
      />

      <NewsPagination
        page={page}
        setPage={(p: number) => dispatch(setPage(p))}
        allPages={allPages}
      />
    </div>
  );
}

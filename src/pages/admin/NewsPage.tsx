import { useAppDispatch, useAppSelector } from '@//app/hooks';
import type { RootState } from '@/app/store';

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
} from '@/features/news/newsSelectors';

import {
  setPage,
  toggleSelectOne,
  toggleSelectAll,
} from '@/features/news/newsSlice';

export default function NewsPage() {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const selectedIds = useAppSelector(selectSelectedIds);

  const pageItems = useAppSelector((state: RootState) =>
    selectPageItems(state, mockNews),
  );

  const allPages = useAppSelector((state: RootState) =>
    selectTotalPages(state, mockNews),
  );

  const all = mockNews.length;
  const published = mockNews.filter((n) => n.type === 'Публичный').length;
  const drafts = mockNews.filter((n) => n.type === 'Черновик').length;

  const allIds = mockNews.map((n) => n.id);

  return (
    <div className="admin__content">
      <NewsHeader />
      <NewsCounters all={all} published={published} drafts={drafts} />

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

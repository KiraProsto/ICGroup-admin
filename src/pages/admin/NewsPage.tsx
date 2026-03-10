import NewsCounters from '@/components/news/NewsCounters';
import NewsHeader from '@/components/news/NewsHeader';
import { mockNews } from '@/components/news/NewsMockData';
import NewsPagination from '@/components/news/NewsPagination';
import NewsTable from '@/components/news/NewsTable';
import { useState } from 'react';

export default function NewsPage() {
  const all = mockNews.length;
  const published = mockNews.filter((n) => n.type === 'Публичный').length;
  const drafts = mockNews.filter((n) => n.type === 'Черновик').length;

  const [page, setPage] = useState(1);
  const perPage = 10;
  const pageItems = mockNews.slice((page - 1) * perPage, page * perPage);
  const allPages = Math.ceil(all / perPage);

  const allIds = mockNews.map((n) => n.id);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="admin__content">
      <NewsHeader />
      <NewsCounters all={all} published={published} drafts={drafts} />
      <NewsTable
        items={pageItems}
        allIds={allIds}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <NewsPagination page={page} setPage={setPage} allPages={allPages} />
    </div>
  );
}

import NewsCounters from '@/components/news/NewsCounters';
import NewsHeader from '@/components/news/NewsHeader';
import { mockNews } from '@/components/news/NewsMockData';
import NewsTable from '@/components/news/NewsTable';
import { useState } from 'react';

export default function NewsPage() {
  const all = mockNews.length;
  const published = mockNews.filter((n) => n.type === 'Публичный').length;
  const drafts = mockNews.filter((n) => n.type === 'Черновик').length;

  const [page] = useState(1);
  const perPage = 10;
  const pageItems = mockNews.slice((page - 1) * perPage, page * perPage);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="admin__content">
      <NewsHeader />
      <NewsCounters all={all} published={published} drafts={drafts} />
      <NewsTable
        items={pageItems}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}

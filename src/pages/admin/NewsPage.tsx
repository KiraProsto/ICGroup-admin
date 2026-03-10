import NewsCounters from '@/components/news/NewsCounters';
import NewsHeader from '@/components/news/NewsHeader';
import { mockNews } from '@/components/news/NewsMockData';

export default function NewsPage() {
  const all = mockNews.length;
  const published = mockNews.filter((n) => n.type === 'Публичный').length;
  const drafts = mockNews.filter((n) => n.type === 'Черновик').length;

  return (
    <div className="admin__content">
      <NewsHeader />

      <NewsCounters all={all} published={published} drafts={drafts} />
    </div>
  );
}

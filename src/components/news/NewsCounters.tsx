import './news.css';

interface INewsCountersProps {
  all: number;
  published: number;
  drafts: number;
}

const formatNumb = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function NewsCounters({
  all,
  published,
  drafts,
}: INewsCountersProps) {
  return (
    <div className="news-counters">
      <p className="news-counters__item">Все ({formatNumb(all)})</p>
      <p className="news-counters__item">
        Опубликовано ({formatNumb(published)})
      </p>
      <p className="news-counters__item">Черновики ({formatNumb(drafts)})</p>
    </div>
  );
}

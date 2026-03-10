interface INewsPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  allPages: number;
}

export default function NewsPagination({
  page,
  setPage,
  allPages,
}: INewsPaginationProps) {
  const prev = () => {
    if (page > 1) setPage(page - 1);
  };
  const next = () => {
    if (page < allPages) setPage(page + 1);
  };

  return (
    <div className="news-pagination">
      <p className="news-pagination__text">
        {' '}
        {page} из {allPages}{' '}
      </p>
      <button
        type="button"
        className="news-pagination__arrow"
        onClick={prev}
        disabled={page === 1}
        aria-label="Прошлая страница"
      >
        <img src="/news/left_btn.svg" alt="кнопка влево" />
      </button>

      <button
        type="button"
        className="news-pagination__arrow"
        onClick={next}
        disabled={page === allPages}
        aria-label="Следующая страница"
      >
        <img src="/news/right_btn.svg" alt="кнопка вправо" />
      </button>
    </div>
  );
}

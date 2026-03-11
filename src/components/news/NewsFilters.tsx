import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteSelected, setFilter } from '@/features/news/newsSlice';
import './news.css';

export default function NewsFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.news.filters);

  return (
    <div className="news-filters">
      <div className="news-filters__select-wrapper">
        <select
          className="news-filters__select"
          value={filters.action}
          onChange={(e) =>
            dispatch(setFilter({ key: 'action', value: e.target.value }))
          }
        >
          <option value="">Действия</option>
          <option value="delete">Удалить</option>
        </select>
      </div>

      <div className="news-filters__select-wrapper">
        <select
          className="news-filters__select"
          value={filters.type}
          onChange={(e) =>
            dispatch(setFilter({ key: 'type', value: e.target.value }))
          }
        >
          <option value="">Тип</option>
          <option value="Публичный">Публичный</option>
          <option value="Черновик">Черновик</option>
        </select>
      </div>

      <div className="news-filters__select-wrapper">
        <select
          className="news-filters__select"
          value={filters.category}
          onChange={(e) =>
            dispatch(setFilter({ key: 'category', value: e.target.value }))
          }
        >
          <option value="">Рубрика</option>
        </select>
      </div>

      <div className="news-filters__select-wrapper">
        <select
          className="news-filters__select"
          value={filters.date}
          onChange={(e) =>
            dispatch(setFilter({ key: 'date', value: e.target.value }))
          }
        >
          <option value="">Дата</option>
        </select>
      </div>

      <button
        type="button"
        className="news-filters__btn"
        aria-label="Кнопка применить действия"
        onClick={() => {
          if (filters.action === 'delete') {
            dispatch(deleteSelected());
          }
        }}
      >
        Применить
      </button>

      <div className="news-filters__search-wrapper">
        <input
          type="text"
          placeholder="Найти публикацию"
          className="news-filters__search"
          value={filters.search}
          onChange={(e) =>
            dispatch(setFilter({ key: 'search', value: e.target.value }))
          }
        />
        <img
          src="/news/search.svg"
          alt="Поиск"
          className="news-filters__icon"
        />
      </div>
    </div>
  );
}

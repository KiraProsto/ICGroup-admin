import { useNavigate } from 'react-router-dom';
import './news.css';

export default function NewsHeader() {
  const navigate = useNavigate();
  return (
    <div className="news-header">
      <h1 className="news-header__title">Новости</h1>
      <button
        type="button"
        className="news-header__add-btn"
        aria-label="Добавить новость"
        onClick={() => navigate('/admin/news/add')}
      >
        <img src="/news/addnews.svg" alt="Добавить новость" />
      </button>

      <button
        type="button"
        className="news-header__settings-btn"
        aria-label="Настройки"
      >
        <img src="/news/settings.svg" alt="Настройки" />
      </button>
    </div>
  );
}

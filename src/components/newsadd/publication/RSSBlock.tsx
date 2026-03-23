import '../newsadd.css';

export default function RSSBlock() {
  return (
    <div className="add-rss">
      <div className="add__block">
        <h2 className="add__title">RSS</h2>
        <div className="add-rss__modes">
          <button type="button" className="add-rss__mode-btn">
            Google Новости
          </button>
          <button type="button" className="add-rss__mode-btn">
            Яндекс.Дзен
          </button>
          <button
            type="button"
            className="add-rss__mode-btn add-rss__mode-btn-active"
            aria-pressed="true"
          >
            Яндекс.Новости
          </button>
          <button type="button" className="add-rss__mode-btn">
            RSS
          </button>
        </div>
      </div>
    </div>
  );
}

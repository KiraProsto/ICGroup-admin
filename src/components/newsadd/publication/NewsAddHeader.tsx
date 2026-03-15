import '../newsadd.css';

type Mode = 'publication' | 'text';

interface INewsAddHeaderProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export default function NewsAddHeader({ mode, setMode }: INewsAddHeaderProps) {
  return (
    <div className="add-header">
      <div className="add-header__modes">
        <button
          type="button"
          className={
            mode === 'publication'
              ? 'add-header__mode-btn add-header__mode-btn-active'
              : 'add-header__mode-btn'
          }
          onClick={() => setMode('publication')}
        >
          Редактирование публикации
        </button>
        <button
          type="button"
          className={
            mode === 'text'
              ? 'add-header__mode-btn add-header__mode-btn-active'
              : 'add-header__mode-btn'
          }
          onClick={() => setMode('text')}
        >
          Редактирование текста
        </button>
      </div>

      <div className="add-header__url-block">
        <label className="add-header__url-label">URL</label>
        <input type="text" className="add-header__url-input" />
        <div className="add-header__actions">
          <button className="add-header__action-btn">Публикация</button>
          <button className="add-header__action-btn">Превью</button>
          <button className="add-header__action-btn">Черновик</button>
          <button className="add-header__action-btn">Удалить</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import './newsadd.css';
import PreviewModal from './preview/PreviewModal';

type Mode = 'publication' | 'text_redaction';

interface INewsAddHeaderProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export default function NewsAddHeader({ mode, setMode }: INewsAddHeaderProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

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
          aria-pressed={mode === 'publication'}
        >
          Редактирование публикации
        </button>
        <button
          type="button"
          className={
            mode === 'text_redaction'
              ? 'add-header__mode-btn add-header__mode-btn-active'
              : 'add-header__mode-btn'
          }
          onClick={() => setMode('text_redaction')}
          aria-pressed={mode === 'text_redaction'}
        >
          Редактирование текста
        </button>
      </div>

      <div className="add-header__url-block">
        <label htmlFor="news-url" className="add-header__url-label">
          URL
        </label>
        <input id="news-url" type="text" className="add-header__url-input" />
        <div className="add-header__actions">
          <button type="button" className="add-header__action-btn">
            Публикация
          </button>
          <button
            type="button"
            className="add-header__action-btn"
            onClick={() => setPreviewOpen(true)}
          >
            Превью
          </button>
          <button type="button" className="add-header__action-btn">
            Черновик
          </button>
          <button type="button" className="add-header__action-btn">
            Удалить
          </button>
        </div>
      </div>

      {previewOpen && <PreviewModal onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}

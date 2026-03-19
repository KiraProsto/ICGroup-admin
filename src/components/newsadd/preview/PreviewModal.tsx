import './preview.css';
import PreviewRenderer from './PreviewRenderer';

export default function PreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Предпросмотр публикации"
    >
      <div className="preview-window">
        <button
          type="button"
          className="preview-btn"
          aria-label="Закрыть предпросмотр"
          onClick={onClose}
        >
          <img src="/newsadd/preview/close-btn.svg" alt="" aria-hidden="true" />
        </button>

        <div className="preview-content">
          <PreviewRenderer />
        </div>
      </div>
    </div>
  );
}

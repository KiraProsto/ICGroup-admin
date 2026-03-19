import './preview.css';
import PreviewRenderer from './PreviewRenderer';

export default function PreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="preview-overlay">
      <div className="preview-window">
        <button
          type="button"
          className="preview-btn"
          aria-label="Закрыть предпросмотр"
          onClick={onClose}
        >
          <img src="/newsadd/preview/close-btn.svg" alt="" />
        </button>

        <div className="preview-content">
          <PreviewRenderer />
        </div>
      </div>
    </div>
  );
}

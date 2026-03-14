import type { RootState } from '@/app/store';
import './newsadd.css';
import { useDispatch, useSelector } from 'react-redux';
import { openPicker } from '@/features/newsadd/mediaSlice';

export default function MediaActions() {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.media.selectedImages);

  return (
    <div className="add-media">
      <div className="add-media__actions">
        <button
          type="button"
          className="add-media__action-btn"
          onClick={() => dispatch(openPicker())}
        >
          Добавить картинку
        </button>
        <button type="button" className="add-media__action-btn">
          Добавить медиа
        </button>
      </div>

      <div className="add-media__cards">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`media-${i}`}
            className="add-media__card"
          />
        ))}
      </div>
    </div>
  );
}

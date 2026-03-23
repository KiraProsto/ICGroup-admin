import { useDispatch } from 'react-redux';
import { MediaMockData } from './MediaMockData';
import { addImage, closePicker } from '@/features/newsadd/media/mediaSlice';
import '../newsadd.css';

export default function MediaPicker() {
  const dispatch = useDispatch();
  return (
    <div className="media-picker">
      <div
        className="media-picker__overlay"
        onClick={() => dispatch(closePicker())}
      ></div>

      <div
        className="media-picker__window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-picker-title"
      >
        <h3 className="media-picker__title" id="media-picker-title">
          Выберите картинку
        </h3>
        <div className="media-picker__grid">
          {MediaMockData.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className="media-picker__item"
              onClick={() => {
                if (!img.src) return;
                dispatch(addImage(img.src));
                dispatch(closePicker());
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

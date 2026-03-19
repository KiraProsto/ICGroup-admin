import Functions from './Functions';
import './cards.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { updateCardVideo } from '@/features/newsadd/cards/CardsSlice';

export default function VideoCard({
  id,
  moveUp,
  moveDown,
  deleteCard,
}: {
  id: string;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  deleteCard: (id: string) => void;
}) {
  const card = useSelector((state: RootState) =>
    state.cards.list.find((c) => c.id === id),
  );
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Видео</h1>
        <Functions
          onUp={() => moveUp(id)}
          onDown={() => moveDown(id)}
          onDelete={() => deleteCard(id)}
        />
      </div>
      <input
        type="text"
        className="card__input-title"
        placeholder="URL"
        value={card?.videoUrl ?? ''}
        onChange={(e) =>
          dispatch(
            updateCardVideo({
              id,
              url: e.target.value,
              alt: card?.videoAlt ?? '',
            }),
          )
        }
      />
      <input
        type="text"
        className="card__input-title"
        placeholder="Описание"
        value={card?.videoAlt ?? ''}
        onChange={(e) =>
          dispatch(
            updateCardVideo({
              id,
              url: card?.videoUrl ?? '',
              alt: e.target.value,
            }),
          )
        }
      />

      {card?.videoUrl && (
        <video src={card?.videoUrl} className="card__img-preview" controls />
      )}
    </div>
  );
}

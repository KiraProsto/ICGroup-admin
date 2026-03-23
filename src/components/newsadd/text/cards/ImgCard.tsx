import Functions from './Functions';
import './cards.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { updateCardImage } from '@/features/newsadd/cards/CardsSlice';

export default function ImgCard({
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
        <h1 className="card__title">Изображение</h1>
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
        value={card?.imgUrl ?? ''}
        onChange={(e) =>
          dispatch(
            updateCardImage({
              id,
              url: e.target.value,
              alt: card?.imgAlt ?? '',
            }),
          )
        }
      />
      <input
        type="text"
        className="card__input-title"
        placeholder="Описание"
        value={card?.imgAlt ?? ''}
        onChange={(e) =>
          dispatch(
            updateCardImage({
              id,
              url: card?.imgUrl ?? '',
              alt: e.target.value,
            }),
          )
        }
      />

      {card?.imgUrl && (
        <div className="card__img-wrapper">
          <img
            src={card?.imgUrl}
            alt={card?.imgAlt || 'preview'}
            className="card__img-preview"
          />

          <div className="card__img-overlay">
            <span className="card__img-alt">{card?.imgAlt}</span>
          </div>
        </div>
      )}
    </div>
  );
}

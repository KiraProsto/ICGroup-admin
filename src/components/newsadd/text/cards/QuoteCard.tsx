import { useDispatch, useSelector } from 'react-redux';
import './cards.css';
import Functions from './Functions';
import { updateCardQuote } from '@/features/newsadd/cards/CardsSlice';
import type { RootState } from '@/app/store';
import { useEffect, useRef } from 'react';

export default function QuoteCard({
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
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) =>
    state.cards.list.find((c) => c.id === id),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && card?.quote && ref.current.innerHTML === '') {
      ref.current.innerHTML = card.quote;
    }
  }, [card?.quote]);

  if (!card) return null;

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Цитата</h1>
        <Functions
          onUp={() => moveUp(id)}
          onDown={() => moveDown(id)}
          onDelete={() => deleteCard(id)}
        />
      </div>
      <div
        ref={ref}
        className="card__input-title"
        contentEditable
        onInput={(e) =>
          dispatch(
            updateCardQuote({ id, quote: e.currentTarget.innerHTML || '' }),
          )
        }
        role="textbox"
        aria-multiline="true"
        aria-label="Цитата"
      />
    </div>
  );
}

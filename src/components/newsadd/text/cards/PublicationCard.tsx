import Functions from './Functions';
import './cards.css';
import '../../newsadd.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCardSearch,
  selectCardPublication,
} from '@/features/newsadd/cards/CardsSlice';
import type { RootState } from '@/app/store';
import { PublicationMockData } from './PublicationMockData';

export default function PublicationCard({
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

  if (!card) return null;
  const suggestions =
    card.search && card.search.trim()
      ? PublicationMockData.filter((title) =>
          title.toLowerCase().includes(card.search.toLowerCase()),
        ).slice(0, 4)
      : [];

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Публикация</h1>
        <Functions
          onUp={() => moveUp(id)}
          onDown={() => moveDown(id)}
          onDelete={() => deleteCard(id)}
        />
      </div>

      <div className="add__input-wrapper">
        <input
          type="text"
          className="add__input-search"
          value={card.selectedPublication?.title || card.search || ''}
          onChange={(e) => {
            dispatch(selectCardPublication({ id, publication: null }));
            dispatch(updateCardSearch({ id, search: e.target.value }));
          }}
          aria-autocomplete="list"
          aria-controls={`pub-list-${id}`}
          aria-expanded={suggestions.length > 0}
          aria-label="Поиск публикации"
        />

        {suggestions.length > 0 && (
          <ul className="add__suggestions" id={`pub-list-${id}`} role="listbox">
            {suggestions.map((name) => (
              <li
                key={name}
                role="option"
                aria-selected={false}
                className="add__suggestion-item"
                onClick={() =>
                  dispatch(
                    selectCardPublication({
                      id,
                      publication: { title: name, url: '#' },
                    }),
                  )
                }
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

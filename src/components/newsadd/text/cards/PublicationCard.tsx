import Functions from './Functions';
import './cards.css';
import '../../newsadd.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPublications,
  setSearch,
} from '@/features/newsadd/publications/publicationsSlice';
import type { RootState } from '@/app/store';

export default function PublicationCard() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.publications.search);
  const suggestions = useSelector(
    (state: RootState) => state.publications.suggestions,
  );

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Публикация</h1>
        <Functions />
      </div>
      <div className="add__input-wrapper">
        <input
          type="text"
          className="add__input-search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        {suggestions.length > 0 && (
          <ul className="add__suggestions">
            {suggestions.map((name) => (
              <li
                key={name}
                className="add__suggestion-item"
                onClick={() => dispatch(selectPublications(name))}
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

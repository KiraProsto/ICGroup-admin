import type { RootState } from '@/app/store';
import {
  selectAuthors,
  setSearch,
} from '@/features/newsadd/authors/authorsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function MainInfo() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.authors.search);
  const suggestions = useSelector(
    (state: RootState) => state.authors.suggestions,
  );

  return (
    <div className="add-main">
      <div className="add__block">
        <h2 className="add__title">Заголовок</h2>
        <input type="text" className="add__input-title" />
      </div>
      <div className="add__block">
        <h2 className="add__title">Автор</h2>

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
                  onClick={() => dispatch(selectAuthors(name))}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

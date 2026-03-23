import './cards.css';

interface IFunctionsProps {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
}

export default function Functions({ onUp, onDown, onDelete }: IFunctionsProps) {
  return (
    <div className="card__function">
      <button
        type="button"
        className="card__function-btn"
        aria-label="Поднять карточку"
        onClick={onUp}
      >
        <img
          src="/newsadd/cards-functions/up_btn.svg"
          alt=""
          className="card__function-img"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        className="card__function-btn"
        aria-label="Опустить карточку"
        onClick={onDown}
      >
        <img
          src="/newsadd/cards-functions/down_btn.svg"
          alt=""
          className="card__function-img"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        className="card__function-btn"
        aria-label="Удалить карточку"
        onClick={onDelete}
      >
        <img
          src="/newsadd/cards-functions/delete.svg"
          alt=""
          className="card__function-img"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

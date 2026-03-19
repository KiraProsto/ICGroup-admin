import './cards.css';

interface IFunctionsProps {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
}

export default function Functions({ onUp, onDown, onDelete }: IFunctionsProps) {
  return (
    <div className="card__function">
      <img
        src="/newsadd/cards-functions/up_btn.svg"
        alt="Поднять карточку"
        className="card__function-img"
        onClick={onUp}
      />
      <img
        src="/newsadd/cards-functions/down_btn.svg"
        alt="Опустить карточку"
        className="card__function-img"
        onClick={onDown}
      />
      <img
        src="/newsadd/cards-functions/delete.svg"
        alt="Удалить карточку"
        className="card__function-img"
        onClick={onDelete}
      />
    </div>
  );
}

import './cards.css';
export default function Functions() {
  return (
    <div className="card__function">
      <img
        src="/newsadd/cards-functions/up_btn.svg"
        alt="Поднять карточку"
        className="card__function-img"
      />
      <img
        src="/newsadd/cards-functions/down_btn.svg"
        alt="Опустить карточку"
        className="card__function-img"
      />
      <img
        src="/newsadd/cards-functions/delete.svg"
        alt="Удалить карточку"
        className="card__function-img"
      />
    </div>
  );
}

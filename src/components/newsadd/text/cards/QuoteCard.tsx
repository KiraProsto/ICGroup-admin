import './cards.css';
import Functions from './Functions';

export default function QuoteCard() {
  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Цитата</h1>
        <Functions />
      </div>
      <div className="card__input-title" contentEditable="true" />
    </div>
  );
}

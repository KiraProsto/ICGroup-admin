import './cards.css';
import FunctionsPlus from './FunctionsPlus';

export default function QuoteCard() {
  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Цитата</h1>
        <FunctionsPlus />
      </div>
      <div className="card__input-title" contentEditable="true" />
    </div>
  );
}

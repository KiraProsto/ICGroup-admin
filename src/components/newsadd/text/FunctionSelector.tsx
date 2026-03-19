import { useState } from 'react';
import '../newsadd.css';
import type { CardType } from '@/features/newsadd/cards/CardsTypes';

export default function FunctionSelector({
  onAddCard,
}: {
  onAddCard: (type: CardType) => void;
}) {
  const [selected, setSelected] = useState<CardType | ''>('');

  const functions: { value: CardType; label: string }[] = [
    { value: 'text_card', label: 'Текст' },
    { value: 'quote_card', label: 'Цитата' },
    { value: 'publication_card', label: 'Публикация' },
    { value: 'img_card', label: 'Картинка' },
    { value: 'video_card', label: 'Видео' },
  ];
  return (
    <div className="add-functions">
      <div className="add-functions__actions">
        <select
          className="add-category__select"
          value={selected}
          onChange={(e) => setSelected(e.target.value as CardType)}
        >
          <option value="" disabled>
            Тип карточки
          </option>

          {functions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="add-header__action-btn"
          onClick={() => selected && onAddCard(selected)}
        >
          Добавить карточку
        </button>
      </div>
    </div>
  );
}

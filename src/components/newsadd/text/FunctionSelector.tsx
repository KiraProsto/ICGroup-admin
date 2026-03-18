import { useState } from 'react';
import '../newsadd.css';

export default function FunctionSelector({
  onAddCard,
}: {
  onAddCard: (type: string) => void;
}) {
  const [selected, setSelected] = useState('');

  const functions = [
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
          onChange={(e) => setSelected(e.target.value)}
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
          className="add-header__action-btn"
          onClick={() => selected && onAddCard(selected)}
        >
          Добавить карточку
        </button>
      </div>
    </div>
  );
}

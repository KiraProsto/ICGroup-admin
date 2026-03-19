import { useState } from 'react';
import '../newsadd.css';

export default function CategorySelector() {
  const rubric = [
    { value: 'telecom', label: '+7Телеком' },
    { value: 'logistic', label: 'Логистика' },
    { value: 'connection', label: 'Связь' },
    { value: 'events', label: 'События' },
    { value: 'retail', label: 'Ритейл' },
  ];

  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;

    v = v.replace(/\D/g, '');
    v = v.slice(0, 8);

    if (v.length >= 5) {
      v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1.$2.$3');
    } else if (v.length >= 3) {
      v = v.replace(/(\d{2})(\d{1,2})/, '$1.$2');
    }

    setValue(v);
  };

  const validateDate = () => {
    if (value.length !== 10) return;

    const [dd, mm, yyyy] = value.split('.').map(Number);

    if (mm < 1 || mm > 12) {
      setValue('');
      return;
    }

    const daysInMonth = new Date(yyyy, mm, 0).getDate();

    if (dd < 1 || dd > daysInMonth) {
      setValue('');
      return;
    }

    const inputDate = new Date(yyyy, mm - 1, dd);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      setValue('');
      return;
    }
  };

  return (
    <div className="add-category">
      <div className="add-category__select-wrapper">
        <select className="add-category__select">
          <option value="" disabled>
            Рубрика
          </option>

          {rubric.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="add-category__date-input">
        <input
          type="text"
          className="add-category__date-input__filed"
          placeholder="01.01.2001"
          value={value}
          onChange={handleChange}
          onBlur={validateDate}
          aria-label="Дата публикации"
        />
      </div>
    </div>
  );
}

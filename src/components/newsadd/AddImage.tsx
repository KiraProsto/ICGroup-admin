import { useRef } from 'react';
import './newsadd.css';

interface IAddImageFieldProps {
  value: File | null;
  onChange: (file: File) => void;
}

export default function AddImage({ value, onChange }: IAddImageFieldProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="add__img">
      <div className="add__img-controls">
        <h3 className="add__subtitle">Изображение</h3>
        <button
          type="button"
          className="add__btn"
          aria-label="Добавить изображение из галереи"
          onClick={() => fileRef.current?.click()}
        >
          <img src="/news/addnews.svg" alt="Добавить изображение" />
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleSelect}
        style={{ display: 'none' }}
      />

      {value && (
        <img
          src={URL.createObjectURL(value)}
          alt="preview"
          className="add__img-preview"
        />
      )}
    </div>
  );
}

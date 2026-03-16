import { useState } from 'react';
import Functions from './Functions';
import './cards.css';

export default function ImgCard() {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Изображение</h1>
        <Functions />
      </div>
      <input
        type="text"
        className="card__input-title"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        className="card__input-title"
        placeholder="Описание"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
      />

      {url && (
        <div className="card__img-wrapper">
          <img src={url} alt={alt || 'preview'} className="card__img-preview" />

          <div className="card__img-overlay">
            <span className="card__img-alt">{alt}</span>
          </div>
        </div>
      )}
    </div>
  );
}

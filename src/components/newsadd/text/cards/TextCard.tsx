import { useEffect, useRef, useState } from 'react';
import './cards.css';
import Functions from './Functions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { updateCardContent } from '@/features/newsadd/cards/CardsSlice';

export default function TextCard({
  id,
  moveUp,
  moveDown,
  deleteCard,
}: {
  id: string;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  deleteCard: (id: string) => void;
}) {
  const [showTextPalette, setShowTextPalette] = useState(false);
  const [showBgPalette, setShowBgPalette] = useState(false);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const COLORS = [
    '#000000',
    '#888888',
    '#CCCCCC',
    '#FFFFFF',
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#1DE9B6',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#8B00FF',
  ];

  const applyWeight = (weight: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    const selectedText = selection.toString();

    const span = document.createElement('span');
    span.style.fontWeight = weight;
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);

    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  const applyColor = (color: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, color);
  };

  const applyBg = (color: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('hiliteColor', false, color);
  };

  const applyBulletList = () => {
    restoreSelection();
    document.execCommand('insertUnorderedList');
  };

  const applyNumberList = () => {
    restoreSelection();
    document.execCommand('insertOrderedList');
  };

  const card = useSelector((state: RootState) =>
    state.cards.list.find((c) => c.id === id),
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && card?.content && ref.current.innerHTML === '') {
      ref.current.innerHTML = card.content;
    }
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Текст</h1>
        <Functions
          onUp={() => moveUp(id)}
          onDown={() => moveDown(id)}
          onDelete={() => deleteCard(id)}
        />
      </div>
      <div className="card__text-wrapper">
        <div className="card__text-functions">
          <select
            className="card__text-select"
            onChange={(e) => applyWeight(e.target.value)}
          >
            <option value="300">Light</option>
            <option value="400">Normal</option>
            <option value="600">Semi Bold</option>
            <option value="700">Bold</option>
            <option value="900">Black</option>
          </select>

          <div className="card__text-decoration">
            <button
              type="button"
              aria-label="Жирный текст"
              onClick={() => document.execCommand('bold')}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              aria-label="Курсив"
              onClick={() => document.execCommand('italic')}
            >
              <i>I</i>
            </button>
            <button
              type="button"
              aria-label="Подчеркнутый"
              onClick={() => document.execCommand('underline')}
            >
              <u>U</u>
            </button>
            <button
              type="button"
              aria-label="Зачеркнутый"
              onClick={() => document.execCommand('strikeThrough')}
            >
              <s>S</s>
            </button>
          </div>

          <div className="card__text-color-decoration">
            <button
              type="button"
              onMouseDown={() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                  setSavedRange(sel.getRangeAt(0));
                }
              }}
              onClick={() => setShowTextPalette(!showTextPalette)}
            >
              <img
                src="/newsadd/cards-functions/color-font.svg"
                className="card__function-img"
              />
            </button>

            {showTextPalette && (
              <div className="palette" role="menu">
                {COLORS.map((c) => (
                  <div
                    key={c}
                    className="palette-color"
                    role="menuitem"
                    style={{ backgroundColor: c }}
                    onClick={() => applyColor(c)}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onMouseDown={() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                  setSavedRange(sel.getRangeAt(0));
                }
              }}
              onClick={() => setShowBgPalette(!showBgPalette)}
            >
              <img
                src="/newsadd/cards-functions/bg-color.svg"
                className="card__function-img"
              />
            </button>

            {showBgPalette && (
              <div className="palette">
                {COLORS.map((c) => (
                  <div
                    key={c}
                    className="palette-color"
                    style={{ backgroundColor: c }}
                    onClick={() => applyBg(c)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="card__text-list-decoration">
            <button
              type="button"
              onMouseDown={() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                  setSavedRange(sel.getRangeAt(0));
                }
              }}
              onClick={applyBulletList}
            >
              <img
                src="/newsadd/cards-functions/list_tchk.svg"
                className="card__function-img"
              />
            </button>

            <button
              type="button"
              onMouseDown={() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                  setSavedRange(sel.getRangeAt(0));
                }
              }}
              onClick={applyNumberList}
            >
              <img
                src="/newsadd/cards-functions/list_num.svg"
                className="card__function-img"
              />
            </button>
          </div>
        </div>
        <div
          ref={ref}
          className="card__input-title"
          contentEditable
          onInput={(e) =>
            dispatch(
              updateCardContent({ id, content: e.currentTarget.innerHTML }),
            )
          }
          role="textbox"
          aria-multiline="true"
          aria-label="Текст карточки"
        />
      </div>
    </div>
  );
}

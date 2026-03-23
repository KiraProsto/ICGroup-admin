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

    saveContent();
  };

  const applyFontSize = (size: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    const span = document.createElement('span');
    span.style.fontSize = `${size}px`;
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);

    selection.removeAllRanges();
    selection.addRange(newRange);

    saveContent();
  };

  const findStyledParent = (
    node: Node,
    cssProp: string,
    value: string,
  ): HTMLElement | null => {
    let el = node.parentElement;

    while (el) {
      if (el.style?.getPropertyValue(cssProp) === value) {
        return el;
      }
      el = el.parentElement;
    }

    return null;
  };

  const applyInlineStyle = (cssProp: string, value: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    const styledParent = findStyledParent(
      range.commonAncestorContainer,
      cssProp,
      value,
    );

    if (styledParent) {
      const text = document.createTextNode(styledParent.textContent || '');
      styledParent.replaceWith(text);
      saveContent();
      return;
    }

    const content = range.extractContents();
    const span = document.createElement('span');
    span.style.setProperty(cssProp, value);
    span.appendChild(content);

    range.insertNode(span);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);

    saveContent();
  };

  const applyBold = () => applyInlineStyle('font-weight', 'bold');
  const applyItalic = () => applyInlineStyle('font-style', 'italic');
  const applyUnderline = () => applyInlineStyle('text-decoration', 'underline');
  const applyStrike = () => applyInlineStyle('text-decoration', 'line-through');

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  const applyTextColor = (color: string) => {
    restoreSelection();
    applyInlineStyle('color', color);
  };

  const applyBgColor = (color: string) => {
    restoreSelection();
    applyInlineStyle('background-color', color);
  };

  const toggleList = (type: 'ul' | 'ol') => {
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    let parent = range.commonAncestorContainer.parentElement;
    while (parent && parent.tagName !== 'UL' && parent.tagName !== 'OL') {
      parent = parent.parentElement;
    }

    if (parent && (parent.tagName === 'UL' || parent.tagName === 'OL')) {
      const fragment = document.createDocumentFragment();

      parent.querySelectorAll('li').forEach((li) => {
        fragment.append(...Array.from(li.childNodes));
      });

      parent.replaceWith(fragment);
      saveContent();
      return;
    }

    const content = range.extractContents();
    const text = content.textContent || '';

    const items = text.split('\n').filter((t) => t.trim() !== '');

    const list = document.createElement(type);

    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    range.insertNode(list);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(list);
    selection.addRange(newRange);

    saveContent();
  };

  const applyBulletList = () => toggleList('ul');
  const applyNumberList = () => toggleList('ol');

  const card = useSelector((state: RootState) =>
    state.cards.list.find((c) => c.id === id),
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!card?.content) return;

    const isFocused = document.activeElement === el;
    const isSameContent = el.innerHTML === card.content;

    if (isFocused || isSameContent) return;

    el.innerHTML = card.content;
  }, [id, card?.content]);

  const saveContent = () => {
    if (ref.current) {
      dispatch(updateCardContent({ id, content: ref.current.innerHTML }));
    }
  };

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
            aria-label="жирность текста"
            onChange={(e) => applyWeight(e.target.value)}
          >
            <option value="300">Light</option>
            <option value="400">Normal</option>
            <option value="600">Semi Bold</option>
            <option value="700">Bold</option>
            <option value="900">Black</option>
          </select>

          <select
            className="card__text-select"
            aria-label="размер текста"
            onChange={(e) => applyFontSize(e.target.value)}
          >
            <option value="16">16</option>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="28">28</option>
            <option value="32">32</option>
            <option value="36">36</option>
          </select>

          <div className="card__text-decoration">
            <button
              type="button"
              aria-label="Жирный текст"
              onClick={() => applyBold()}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              aria-label="Курсив"
              onClick={() => applyItalic()}
            >
              <i>I</i>
            </button>
            <button
              type="button"
              aria-label="Подчеркнутый"
              onClick={() => applyUnderline()}
            >
              <u>U</u>
            </button>
            <button
              type="button"
              aria-label="Зачеркнутый"
              onClick={() => applyStrike()}
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
                    onClick={() => applyTextColor(c)}
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
                    onClick={() => applyBgColor(c)}
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

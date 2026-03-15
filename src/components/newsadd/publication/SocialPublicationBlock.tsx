import { useDispatch, useSelector } from 'react-redux';
import AddImage from '../AddImage';
import '../newsadd.css';
import type { RootState } from '@/app/store';
import { setImage } from '@/features/newsadd/addImage/addImageSlice';

export default function SocialPublicationBlock() {
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.image['social']);

  return (
    <div className="add-social">
      <div className="add__block">
        <h2 className="add__title">Публикации в соц. сетях</h2>

        <div className="add-social__modes">
          <button
            type="button"
            className="add-social__mode-btn add-social__mode-btn-active"
          >
            Facebook
          </button>
          <button type="button" className="add-social__mode-btn">
            ВКонтакте
          </button>
          <button type="button" className="add-social__mode-btn">
            Telegram
          </button>
          <button type="button" className="add-social__mode-btn">
            SEO
          </button>
        </div>

        <h3 className="add__subtitle">Заголовок</h3>
        <input type="text" className="add__input-title" />
        <h3 className="add__subtitle">Текст</h3>
        <textarea className="add__input-text" />
        <AddImage
          value={image}
          onChange={(file) => dispatch(setImage({ key: 'social', file }))}
        />
      </div>
    </div>
  );
}

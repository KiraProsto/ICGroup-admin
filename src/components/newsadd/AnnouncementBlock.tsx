import { useDispatch, useSelector } from 'react-redux';
import AddImage from './AddImage';
import './newsadd.css';
import type { RootState } from '@/app/store';
import { setImage } from '@/features/newsadd/addImage/addImageSlice';

export default function AnnouncementBlock() {
  const image = useSelector((state: RootState) => state.image['announcement']);
  const dispatch = useDispatch();
  return (
    <div className="add-announce">
      <div className="add__block">
        <h2 className="add__title">Анонс</h2>
        <h3 className="add__subtitle">Заголовок</h3>
        <input type="text" className="add__input-title" />
        <h3 className="add__subtitle">Текст</h3>
        <textarea className="add__input-text" />
        <AddImage
          value={image}
          onChange={(file) => dispatch(setImage({ key: 'announcement', file }))}
        />
      </div>
    </div>
  );
}

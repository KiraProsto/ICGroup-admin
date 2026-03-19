import type { RootState } from '@/app/store';
import AnnouncementBlock from '@/components/newsadd/publication/AnnouncementBlock';
import CategorySelector from '@/components/newsadd/publication/CategorySelector';
import MainInfo from '@/components/newsadd/publication/MainInfo';
import MediaActions from '@/components/newsadd/publication/MediaActions';
import MediaPicker from '@/components/newsadd/publication/MediaPicker';
import NewsAddHeader from '@/components/newsadd/NewsAddHeader';
import PublicationIndex from '@/components/newsadd/publication/PublicationIndex';
import RSSBlock from '@/components/newsadd/publication/RSSBlock';
import SocialPublicationBlock from '@/components/newsadd/publication/SocialPublicationBlock';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CardsContainer from '@/components/newsadd/text/CardsContainer';

export default function NewsAddPage() {
  type Mode = 'publication' | 'text_redaction';
  const [mode, setMode] = useState<Mode>('publication');
  const pickerOpen = useSelector((state: RootState) => state.media.pickerOpen);

  return (
    <div role="main">
      <NewsAddHeader mode={mode} setMode={setMode} />
      {mode === 'publication' && (
        <div
          className="news-add-layout"
          role="region"
          aria-label="Редактирование публикации"
        >
          <div className="news-add-layout__left">
            <CategorySelector />
            <MainInfo />
            <AnnouncementBlock />
            <SocialPublicationBlock />
            <RSSBlock />
            <PublicationIndex />
          </div>

          <div className="news-add-layout__right">
            <MediaActions />
          </div>
        </div>
      )}
      {pickerOpen && <MediaPicker />}

      {mode === 'text_redaction' && (
        <div
          className="news-add-layout"
          aria-label="Редактирование текста публикации"
        >
          <div className="news-add-layout__left">
            <CardsContainer />
          </div>

          <div className="news-add-layout__right">
            <MediaActions />
          </div>
        </div>
      )}
    </div>
  );
}

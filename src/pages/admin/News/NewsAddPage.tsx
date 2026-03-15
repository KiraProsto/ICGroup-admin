import type { RootState } from '@/app/store';
import AnnouncementBlock from '@/components/newsadd/AnnouncementBlock';
import CategorySelector from '@/components/newsadd/CategorySelector';
import MainInfo from '@/components/newsadd/MainInfo';
import MediaActions from '@/components/newsadd/MediaActions';
import MediaPicker from '@/components/newsadd/MediaPicker';
import NewsAddHeader from '@/components/newsadd/NewsAddHeader';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function NewsAddPage() {
  type Mode = 'publication' | 'text';
  const [mode, setMode] = useState<Mode>('publication');
  const pickerOpen = useSelector((state: RootState) => state.media.pickerOpen);

  return (
    <div>
      <NewsAddHeader mode={mode} setMode={setMode} />
      {mode === 'publication' && (
        <div className="news-add-layout">
          <div className="news-add-layout__left">
            <CategorySelector />
            <MainInfo />
            <AnnouncementBlock />
            {/* <SocialPublicationBlock /> */}
            {/* <RSSBlock /> */}
            {/* <PublicationIndex /> */}
          </div>

          <div className="news-add-layout__right">
            <MediaActions />
          </div>
        </div>
      )}
      {pickerOpen && <MediaPicker />}
      {/* {mode === 'text' && </>} */}
    </div>
  );
}

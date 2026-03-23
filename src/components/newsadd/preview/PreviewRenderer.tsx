import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import PreviewQuote from './PreviewQuote';
import PreviewPublication from './PreviewPublication';
import PreviewImage from './PreviewImage';
import PreviewVideo from './PreviewVideo';
import './preview.css';
import DOMPurify from 'dompurify';

export default function PreviewRenderer() {
  const cards = useSelector((state: RootState) => state.cards.list);
  return (
    <div className="preview-renderer" role="document">
      {cards.map((card, index) => {
        const next = cards[index + 1];

        const isText = card.type === 'text_card';
        const nextIsText = next?.type === 'text_card';

        const marginBottom = isText && nextIsText ? 24 : 55;
        switch (card.type) {
          case 'text_card':
            return (
              <div
                style={{ marginBottom }}
                key={card.id}
                className="preview-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(card.content ?? '', {
                    ALLOWED_TAGS: [
                      'b',
                      'i',
                      'u',
                      's',
                      'span',
                      'ul',
                      'ol',
                      'li',
                      'br',
                    ],
                    ALLOWED_ATTR: ['style'],
                  }),
                }}
              />
            );
          case 'quote_card':
            return (
              <div key={card.id} style={{ marginBottom }}>
                <PreviewQuote quote={card.quote ?? ''} />
              </div>
            );
          case 'publication_card':
            return (
              <div key={card.id} style={{ marginBottom }}>
                <PreviewPublication publication={card.selectedPublication} />
              </div>
            );
          case 'img_card':
            return (
              <div key={card.id} style={{ marginBottom }}>
                <PreviewImage
                  imageUrl={card.imgUrl ?? ''}
                  imageAlt={card.imgAlt ?? ''}
                />
              </div>
            );
          case 'video_card':
            return (
              <div key={card.id} style={{ marginBottom }}>
                <PreviewVideo videoUrl={card.videoUrl ?? ''} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

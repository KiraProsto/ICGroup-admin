import ImgCard from './cards/ImgCard';
import PublicationCard from './cards/PublicationCard';
import QuoteCard from './cards/QuoteCard';
import TextCard from './cards/TextCard';
import VideoCard from './cards/VideoCard';

export default function CardsContainer() {
  return (
    <div className="cards-container">
      <TextCard />
      <QuoteCard />
      <PublicationCard />
      <ImgCard />
      <VideoCard />
    </div>
  );
}

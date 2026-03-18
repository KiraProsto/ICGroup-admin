import { useState } from 'react';
import ImgCard from './cards/ImgCard';
import PublicationCard from './cards/PublicationCard';
import QuoteCard from './cards/QuoteCard';
import TextCard from './cards/TextCard';
import VideoCard from './cards/VideoCard';
import FunctionSelector from './FunctionSelector';

export default function CardsContainer() {
  const [cards, setCards] = useState(() => [
    { id: crypto.randomUUID(), type: 'text_card' },
  ]);

  const addCard = (type: string) => {
    setCards((prev) => [...prev, { id: crypto.randomUUID(), type }]);
  };

  const renderCard = (card: { id: string; type: string }) => {
    switch (card.type) {
      case 'text_card':
        return <TextCard key={card.id} />;
      case 'quote_card':
        return <QuoteCard key={card.id} />;
      case 'img_card':
        return <ImgCard key={card.id} />;
      case 'video_card':
        return <VideoCard key={card.id} />;
      case 'publication_card':
        return <PublicationCard key={card.id} />;
      default:
        return null;
    }
  };
  return (
    <div className="cards-container">
      {cards.length <= 2 && <FunctionSelector onAddCard={addCard} />}
      {cards.map(renderCard)}
      {cards.length > 2 && <FunctionSelector onAddCard={addCard} />}
    </div>
  );
}

import ImgCard from './cards/ImgCard';
import PublicationCard from './cards/PublicationCard';
import QuoteCard from './cards/QuoteCard';
import TextCard from './cards/TextCard';
import VideoCard from './cards/VideoCard';
import FunctionSelector from './FunctionSelector';
import type {
  CardType,
  ICardsState,
} from '@/features/newsadd/cards/CardsTypes';
import {
  addCard,
  deleteCard,
  moveCardDown,
  moveCardUp,
} from '@/features/newsadd/cards/CardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export default function CardsContainer() {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.list);

  const handleAddCard = (type: CardType) => {
    dispatch(addCard(type));
  };

  const renderCard = (card: ICardsState) => {
    const props = {
      id: card.id,
      moveUp: () => dispatch(moveCardUp(card.id)),
      moveDown: () => dispatch(moveCardDown(card.id)),
      deleteCard: () => dispatch(deleteCard(card.id)),
    };

    switch (card.type) {
      case 'text_card':
        return <TextCard key={card.id} {...props} />;
      case 'quote_card':
        return <QuoteCard key={card.id} {...props} />;
      case 'img_card':
        return <ImgCard key={card.id} {...props} />;
      case 'video_card':
        return <VideoCard key={card.id} {...props} />;
      case 'publication_card':
        return <PublicationCard key={card.id} {...props} />;
      default:
        return null;
    }
  };
  return (
    <div className="cards-container" role="list">
      {cards.length <= 2 && <FunctionSelector onAddCard={handleAddCard} />}
      {cards.map(renderCard)}
      {cards.length > 2 && <FunctionSelector onAddCard={handleAddCard} />}
    </div>
  );
}

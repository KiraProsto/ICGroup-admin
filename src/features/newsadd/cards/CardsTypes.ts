export type CardType =
  | 'text_card'
  | 'quote_card'
  | 'img_card'
  | 'video_card'
  | 'publication_card';

export interface ICardsState {
  id: string;
  type: CardType;

  content?: string;

  quote?: string;

  search: string;
  selectedPublication: string;

  imgUrl?: string;
  imgAlt?: string;

  videoUrl?: string;
  videoAlt?: string;
}

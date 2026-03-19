import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardType, ICardsState } from './CardsTypes';

interface CardsState {
  list: ICardsState[];
}

const initialState: CardsState = {
  list: [
    {
      id: crypto.randomUUID(),
      type: 'text_card',
      search: '',
      selectedPublication: '',
    },
  ],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<CardType>) {
      state.list.push({
        id: crypto.randomUUID(),
        type: action.payload,
        search: '',
        selectedPublication: '',
      });
    },

    deleteCard(state, action: PayloadAction<string>) {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },

    moveCardUp(state, action: PayloadAction<string>) {
      const index = state.list.findIndex((c) => c.id === action.payload);
      if (index > 0) {
        [state.list[index - 1], state.list[index]] = [
          state.list[index],
          state.list[index - 1],
        ];
      }
    },

    moveCardDown(state, action: PayloadAction<string>) {
      const index = state.list.findIndex((c) => c.id === action.payload);
      if (index < state.list.length - 1) {
        [state.list[index], state.list[index + 1]] = [
          state.list[index + 1],
          state.list[index],
        ];
      }
    },

    updateCardContent(
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) card.content = action.payload.content;
    },

    updateCardSearch(
      state,
      action: PayloadAction<{ id: string; search: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) card.search = action.payload.search;
    },

    selectCardPublication(
      state,
      action: PayloadAction<{ id: string; publication: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) card.selectedPublication = action.payload.publication;
    },

    updateCardQuote(
      state,
      action: PayloadAction<{ id: string; quote: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) card.quote = action.payload.quote;
    },

    updateCardImage(
      state,
      action: PayloadAction<{ id: string; url: string; alt: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) {
        card.imgUrl = action.payload.url;
        card.imgAlt = action.payload.alt;
      }
    },

    updateCardVideo(
      state,
      action: PayloadAction<{ id: string; url: string; alt: string }>,
    ) {
      const card = state.list.find((c) => c.id === action.payload.id);
      if (card) {
        card.videoUrl = action.payload.url;
        card.videoAlt = action.payload.alt;
      }
    },

    resetCards(state) {
      state.list = [
        {
          id: crypto.randomUUID(),
          type: 'text_card',
          search: '',
          selectedPublication: '',
        },
      ];
    },
  },
});

export const {
  addCard,
  deleteCard,
  moveCardUp,
  moveCardDown,
  updateCardContent,
  updateCardSearch,
  selectCardPublication,
  updateCardQuote,
  updateCardImage,
  updateCardVideo,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IPublicationsState } from './publicationsTypes';
import { PublicationMockData } from '@/components/newsadd/text/cards/PublicationMockData';

const initialState: IPublicationsState = {
  search: '',
  suggestions: [],
};

export const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;

      if (!action.payload.trim()) {
        state.suggestions = [];
        return;
      }
      state.suggestions = PublicationMockData.filter((title) =>
        title.toLowerCase().includes(action.payload.toLowerCase()),
      ).slice(0, 4);
    },

    selectPublications(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.suggestions = [];
    },
  },
});

export const { setSearch, selectPublications } = publicationsSlice.actions;
export default publicationsSlice.reducer;

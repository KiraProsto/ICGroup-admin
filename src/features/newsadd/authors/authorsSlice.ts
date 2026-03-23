import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthorsState } from './authorsTypes';
import { AuthorsMockData } from '@/components/newsadd/publication/AuthorsMockData';

const initialState: IAuthorsState = {
  search: '',
  suggestions: [],
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;

      if (!action.payload.trim()) {
        state.suggestions = [];
        return;
      }
      state.suggestions = AuthorsMockData.filter((name) =>
        name.toLowerCase().includes(action.payload.toLowerCase()),
      ).slice(0, 4);
    },

    selectAuthors(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.suggestions = [];
    },
  },
});

export const { setSearch, selectAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;

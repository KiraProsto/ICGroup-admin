import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NewsState } from './newsTypes';

const initialState: NewsState = {
  filters: {
    action: '',
    type: '',
    category: '',
    date: '',
    search: '',
  },
  page: 1,
  perPage: 10,
  selectedIds: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setSelectedIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },

    toggleSelectOne(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((x) => x !== id);
      } else {
        state.selectedIds.push(id);
      }
    },

    toggleSelectAll(state, action: PayloadAction<number[]>) {
      const allIds = action.payload;
      if (state.selectedIds.length === allIds.length) {
        state.selectedIds = [];
      } else {
        state.selectedIds = allIds;
      }
    },
  },
});

export const { setPage, setSelectedIds, toggleSelectOne, toggleSelectAll } =
  newsSlice.actions;

export default newsSlice.reducer;

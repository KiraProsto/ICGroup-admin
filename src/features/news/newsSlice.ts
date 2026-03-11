import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NewsFilters, NewsState } from './newsTypes';
import { mockNews } from '@/components/news/NewsMockData';

const initialState: NewsState = {
  filters: {
    action: '',
    type: '',
    category: '',
    date: '',
    search: '',
  },
  items: mockNews,
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

    setFilter(
      state,
      action: PayloadAction<{ key: keyof NewsFilters; value: string }>,
    ) {
      state.filters[action.payload.key] = action.payload.value;
    },

    deleteSelected(state) {
      state.items = state.items.filter(
        (item) => !state.selectedIds.includes(item.id),
      );
      state.selectedIds = [];
      state.filters.action = '';
    },
  },
});

export const {
  setPage,
  setSelectedIds,
  toggleSelectOne,
  toggleSelectAll,
  setFilter,
  deleteSelected,
} = newsSlice.actions;

export default newsSlice.reducer;

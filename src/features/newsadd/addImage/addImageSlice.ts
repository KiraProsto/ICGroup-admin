import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAddImageState } from './addImageTypes';

const initialState: IAddImageState = {};

export const addImageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<{ key: string; file: File }>) {
      state[action.payload.key] = action.payload.file;
    },
    clearImage(state, action: PayloadAction<string>) {
      state[action.payload] = null;
    },
  },
});

export const { setImage, clearImage } = addImageSlice.actions;
export default addImageSlice.reducer;

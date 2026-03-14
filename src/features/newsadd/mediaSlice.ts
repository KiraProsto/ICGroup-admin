import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IMediaState } from './mediaTypes.ts';

const initialState: IMediaState = {
  selectedImages: [],
  pickerOpen: false,
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    openPicker(state) {
      state.pickerOpen = true;
    },
    closePicker(state) {
      state.pickerOpen = false;
    },
    addImage(state, action: PayloadAction<string>) {
      state.selectedImages.push(action.payload);
    },
    removeImage(state, action: PayloadAction<number>) {
      state.selectedImages.splice(action.payload, 1);
    },
  },
});

export const { openPicker, closePicker, addImage, removeImage } =
  mediaSlice.actions;

export default mediaSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '@/features/auth/authApi';
import newsReducer from '@/features/news/newsSlice';
import mediaReducer from '@/features/newsadd/media/mediaSlice';
import authorsReducer from '@/features/newsadd/authors/authorsSlice';
import addImageReducer from '@/features/newsadd/addImage/addImageSlice';
import publicationsReducer from '@/features/newsadd/publications/publicationsSlice';
import cardsReducer from '@/features/newsadd/cards/CardsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    news: newsReducer,
    media: mediaReducer,
    authors: authorsReducer,
    image: addImageReducer,
    publications: publicationsReducer,
    cards: cardsReducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

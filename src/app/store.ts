import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '@/features/auth/authApi';
import newsReducer from '@/features/news/newsSlice';
import mediaReducer from '@/features/newsadd/mediaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    news: newsReducer,
    media: mediaReducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

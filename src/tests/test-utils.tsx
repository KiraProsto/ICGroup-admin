import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import { authApi } from '@/features/auth/authApi';
import { render } from '@testing-library/react';

export function renderWithProviders(ui: ReactNode) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(authApi.middleware),
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

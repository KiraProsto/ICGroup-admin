import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '@/features/news/newsSlice';
import type { NewsState } from '@/features/news/newsTypes';
import NewsPage from './NewsPage';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';

interface RootState {
  news: NewsState;
}

function renderWithStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: {
      news: newsReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MantineProvider>
        <MemoryRouter initialEntries={['/admin/news']}>
          <NewsPage />
        </MemoryRouter>
      </MantineProvider>
    </Provider>,
  );
}

describe('NewsPage', () => {
  it('Рендерит таблицу новостей', () => {
    renderWithStore();

    const rows = screen.getAllByTestId('news-row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('Фильтр по типу работает', () => {
    renderWithStore();

    const typeSelect = screen.getByDisplayValue('Тип');
    fireEvent.change(typeSelect, { target: { value: 'Черновик' } });

    const rows = screen.getAllByTestId('news-row');
    rows.forEach((row) => {
      expect(row).toHaveTextContent('Черновик');
    });
  });

  it('Поиск работает', () => {
    renderWithStore();

    const input = screen.getByPlaceholderText('Найти публикацию');
    fireEvent.change(input, { target: { value: 'Пример' } });

    const rows = screen.getAllByTestId('news-row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('Пагинация переключает страницы', () => {
    renderWithStore();

    const nextBtn = screen.getByTestId('pagination-next');
    fireEvent.click(nextBtn);

    const pageText = screen.getByTestId('pagination-page');
    expect(pageText).toHaveTextContent('2');
  });
});

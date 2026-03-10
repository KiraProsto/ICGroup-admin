import type { INewsItem } from '@/features/news/newsTypes';

export const mockNews: INewsItem[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  title: 'Пример длинного названия новости в несколько строк',
  type: 'Публичный',
  category: 'Название рубрики',
  author: 'Иван Иванов',
  date: '05.10.2021 в 12:38',
  url: 'https://telesputnik.ru/materials/tech/news/1256',
  views: 1256,
}));

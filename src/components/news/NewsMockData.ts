export interface INewItem {
  id: number;
  title: string;
  type: string;
  category: string;
  author: string;
  date: string;
  url: string;
  views: number;
}

export const mockNews: INewItem[] = Array.from({ length: 5723 }).map(
  (_, i) => ({
    id: i + 1,
    title: 'Пример длинного названия новости в несколько строк',
    type: 'Публичный',
    category: 'Название рубрики',
    author: 'Иван Иванов',
    date: '05.10.2021 в 12:38',
    url: 'https://telesputnik.ru/materials/tech/news/1256',
    views: 1256,
  }),
);

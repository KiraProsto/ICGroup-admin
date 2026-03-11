import { Table } from '@mantine/core';
import type { INewsItem } from '@/features/news/newsTypes';
import './news.css';

interface INewsTableProps {
  items: INewsItem[];
  allIds: number[];
  selectedIds: number[];
  onSelectOne: (id: number) => void;
  onSelectAll: (ids: number[]) => void;
  perPage: number;
}

export default function NewsTable({
  items,
  allIds,
  selectedIds,
  onSelectOne,
  onSelectAll,
  perPage,
}: INewsTableProps) {
  const allSelected = selectedIds.length === allIds.length;

  const emptyRows = Array.from({ length: perPage - items.length });

  return (
    <div className="news-table__wrapper">
      <Table className="news-table" withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="news-table__cell-th">
              <input
                type="checkbox"
                className="news-table__checkbox"
                data-testid="news-checkbox-all"
                checked={allSelected}
                aria-label="Выбрать все новости"
                onChange={() => onSelectAll(allIds)}
              />
            </Table.Th>

            <Table.Th className="news-table__cell-th">Название</Table.Th>
            <Table.Th className="news-table__cell-th">Тип</Table.Th>
            <Table.Th className="news-table__cell-th">Рубрика</Table.Th>
            <Table.Th className="news-table__cell-th">Автор</Table.Th>
            <Table.Th className="news-table__cell-th">Дата</Table.Th>
            <Table.Th className="news-table__cell-th">URL</Table.Th>

            <Table.Th className="news-table__cell-th">
              <img
                src="/news/eye.svg"
                alt="Значок просмотров"
                className="news-table__icon"
              />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <Table.Tr key={item.id} data-testid="news-row">
                <Table.Td className="news-table__cell-td">
                  <input
                    type="checkbox"
                    aria-label={`Выбрать новость ${item.title}`}
                    className="news-table__checkbox"
                    data-testid="news-checkbox"
                    checked={isSelected}
                    onChange={() => onSelectOne(item.id)}
                  />
                </Table.Td>

                <Table.Td className="news-table__cell-td cell-title">
                  {item.title}
                </Table.Td>
                <Table.Td className="news-table__cell-td">{item.type}</Table.Td>
                <Table.Td className="news-table__cell-td">
                  {item.category}
                </Table.Td>
                <Table.Td className="news-table__cell-td">
                  {item.author}
                </Table.Td>
                <Table.Td className="news-table__cell-td">{item.date}</Table.Td>
                <Table.Td className="news-table__cell-td cell-url">
                  {item.url}
                </Table.Td>
                <Table.Td className="news-table__cell-td">
                  {item.views}
                </Table.Td>
              </Table.Tr>
            );
          })}

          {emptyRows.map((_, i) => (
            <Table.Tr key={`empty-${i}`} className="news-table__empty-row">
              <Table.Td className="news-table__cell-td" colSpan={8}></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

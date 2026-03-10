import { Table } from '@mantine/core';
import './news.css';

interface INewsItem {
  id: number;
  title: string;
  type: string;
  category: string;
  author: string;
  date: string;
  url: string;
  views: number;
}

interface INewsTableProps {
  items: INewsItem[];
  allIds: number[];
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  perPage: number;
}

export default function NewsTable({
  items,
  allIds,
  selectedIds,
  setSelectedIds,
  perPage,
}: INewsTableProps) {
  const allSelected = selectedIds.length === allIds.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

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
                checked={allSelected}
                onChange={toggleSelectAll}
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
              <Table.Tr key={item.id}>
                <Table.Td className="news-table__cell-td">
                  <input
                    type="checkbox"
                    className="news-table__checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(item.id)}
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

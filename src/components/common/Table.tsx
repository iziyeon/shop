import { memo } from 'react';

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

const Table = <T extends { id: string | number }>({ 
  data, 
  columns,
  loading,
  emptyMessage = '데이터가 없습니다.'
}: TableProps<T>) => {
  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>;
  }

  if (!data.length) {
    return <div className="text-center p-4">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {columns.map(column => (
              <th key={String(column.key)} className="p-2 text-left">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map(column => (
                <td key={String(column.key)} className="p-2">
                  {column.render 
                    ? column.render(item[column.key], item)
                    : String(item[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Table) as typeof Table;

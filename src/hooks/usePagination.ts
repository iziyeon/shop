import { useMemo } from 'react';

interface PaginationResult {
  totalPages: number;
  currentItems: any[];
  pageNumbers: (number | string)[];
}

export const usePagination = (
  items: any[],
  currentPage: number,
  itemsPerPage: number
): PaginationResult => {
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1, '...');
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push('...', totalPages);
      }
    }

    return { totalPages, currentItems, pageNumbers };
  }, [items, currentPage, itemsPerPage]);

  return paginationData;
};

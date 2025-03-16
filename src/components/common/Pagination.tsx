import { memo } from 'react';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItems: (number | string)[];
  onPageChange: (page: number) => void;
}

const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  paginationItems, 
  onPageChange 
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames(
          'px-3 py-1 rounded border',
          {
            'cursor-not-allowed opacity-50': currentPage === 1,
            'hover:bg-gray-100': currentPage !== 1
          }
        )}
      >
        이전
      </button>
      {paginationItems.map((item, index) => (
        <button
          key={index}
          onClick={() => typeof item === 'number' && onPageChange(item)}
          className={classNames(
            'px-3 py-1 rounded',
            {
              'bg-blue-500 text-white': item === currentPage,
              'hover:bg-gray-100': item !== currentPage && item !== '...',
              'cursor-default': item === '...'
            }
          )}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classNames(
          'px-3 py-1 rounded border',
          {
            'cursor-not-allowed opacity-50': currentPage === totalPages,
            'hover:bg-gray-100': currentPage !== totalPages
          }
        )}
      >
        다음
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;

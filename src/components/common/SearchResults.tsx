import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { Product } from '../../hooks/useProducts';
import LoadingSpinner from './LoadingSpinner';

interface SearchResultsProps {
  searchTerm: string;
  onSelect?: () => void;
}

const SearchResults = ({ searchTerm, onSelect }: SearchResultsProps) => {
  const navigate = useNavigate();
  const { results, isLoading, hasResults } = useSearch(searchTerm);

  if (searchTerm.length < 2) return null;

  if (isLoading) {
    return (
      <div className="absolute top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md z-50 p-2">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (searchTerm && !hasResults) {
    return (
      <div className="absolute top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md z-50 p-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">검색 결과가 없습니다</p>
      </div>
    );
  }

  const handleItemClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    if (onSelect) onSelect();
  };

  return (
    <div className="absolute top-full mt-1 w-64 md:w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md z-50 max-h-96 overflow-auto">
      <ul>
        {results.map((product) => (
          <li 
            key={product.id}
            onClick={() => handleItemClick(product)}
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded overflow-hidden mr-3">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm line-clamp-1">{product.title}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

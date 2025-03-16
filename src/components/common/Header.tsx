import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';

import { CATEGORY, ROUTES } from '../../config/constants';
import { cartItemCountSelector } from '../../recoil/cart';
import { useTheme } from '../../contexts/ThemeContext';
import SearchResults from './SearchResults';

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const cartItemCount = useRecoilValue(cartItemCountSelector);
  const searchRef = useRef<HTMLDivElement>(null);

  // 검색 결과 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 검색어 입력
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length >= 2);
  };

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchResults(false);
    }
  };

  // 검색 결과에서 항목 선택 시
  const handleSearchItemSelect = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* 로고 */}
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            React Shop
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            <Link to={`/category/${CATEGORY.ELECTRONICS}`} className="nav-link">
              전자제품
            </Link>
            <Link to={`/category/${CATEGORY.JEWELRY}`} className="nav-link">
              쥬얼리
            </Link>
            <Link to={`/category/${CATEGORY.MEN_CLOTHING}`} className="nav-link">
              남성의류
            </Link>
            <Link to={`/category/${CATEGORY.WOMEN_CLOTHING}`} className="nav-link">
              여성의류
            </Link>
          </nav>

          {/* 모바일 메뉴 토글 버튼 */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 우측 아이콘 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 다크모드 토글 */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>

            {/* 검색 아이콘 */}
            <div ref={searchRef} className="hidden md:block relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="검색"
                  className="px-3 py-1 rounded-md text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={handleSearchInput}
                  onFocus={() => setShowSearchResults(searchTerm.length >= 2)}
                />
                <button type="submit" className="ml-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </form>
              
              {showSearchResults && (
                <SearchResults searchTerm={searchTerm} onSelect={handleSearchItemSelect} />
              )}
            </div>

            {/* 장바구니 아이콘 */}
            <Link to="/cart" className="relative">
              <ShoppingBagIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-2 px-4 shadow-lg">
            <Link
              to={`/category/${CATEGORY.ELECTRONICS}`}
              className="block py-2 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              전자제품
            </Link>
            <Link
              to={`/category/${CATEGORY.JEWELRY}`}
              className="block py-2 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              쥬얼리
            </Link>
            <Link
              to={`/category/${CATEGORY.MEN_CLOTHING}`}
              className="block py-2 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              남성의류
            </Link>
            <Link
              to={`/category/${CATEGORY.WOMEN_CLOTHING}`}
              className="block py-2 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              여성의류
            </Link>
            
            {/* 모바일 검색창 */}
            <div className="relative py-2">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="검색"
                  className="px-3 py-1 rounded-md text-sm w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={handleSearchInput}
                  onFocus={() => setShowSearchResults(searchTerm.length >= 2)}
                />
                <button type="submit" className="ml-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </form>
              {showSearchResults && (
                <SearchResults searchTerm={searchTerm} onSelect={handleSearchItemSelect} />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

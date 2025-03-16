import { useState, useEffect } from 'react';

export const useDarkMode = (): [boolean, () => void] => {
  // 로컬 스토리지나 미디어 쿼리에서 초기값 가져오기
  const getInitialTheme = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

  const toggleDarkMode = (): void => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // 로컬 스토리지에 설정 저장
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
};

import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 bg-gray-200 dark:bg-gray-600 rounded transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;

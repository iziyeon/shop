export interface SliderProps {
  slides?: Array<{
    image: string;
    title: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
}

export interface ThemeToggleProps {
  initialMode?: 'light' | 'dark';
}

declare module 'daisyui' {
  export interface DaisyUIConfig {
    themes?: string[];
    darkTheme?: string;
  }
}

interface ThemeConfig {
  darkMode: 'class' | 'media';
  themes: string[];
}

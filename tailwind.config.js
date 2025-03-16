import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // HTML 파일도 포함
  darkMode: 'class', // 명시적으로 다크 모드 설정
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // 기본 블루 색상
        secondary: '#10B981', // 그린
        accent: '#F59E0B', // 오렌지
        neutral: '#3D4451', // 중립
        'base-100': '#FFFFFF', // 베이스 흰색
        'base-200': '#F9FAFB', // 베이스 연한 회색
        'base-300': '#F3F4F6', // 베이스 회색
        info: '#3ABFF8', // 정보
        success: '#36D399', // 성공
        warning: '#FBBD23', // 경고
        error: '#F87272', // 에러
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('tailwindcss-animate'),
    require('daisyui') // DaisyUI 플러그인 추가
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3B82F6",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
        dark: {
          "primary": "#3B82F6",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#191D24",
          "base-100": "#1F2937",
          "base-200": "#111827",
          "base-300": "#0F172A",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
      }
    ],
    darkTheme: "dark",
  }
};

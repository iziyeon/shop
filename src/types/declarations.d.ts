// 모듈 선언을 위한 파일
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

// 추가적인 타입 선언 통합
declare module 'daisyui' {
  export interface DaisyUIConfig {
    themes?: string[];
    darkTheme?: string;
  }
}

declare module 'daisyui';
declare module '@tailwindcss/forms';

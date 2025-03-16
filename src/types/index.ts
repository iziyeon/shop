// 다른 파일에서 정의한 타입들을 재내보내기
export * from './cart';
export * from './product';
export * from './route';
export * from './api';

// 기본 인터페이스
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AsyncState<T = unknown> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

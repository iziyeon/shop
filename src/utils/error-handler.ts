import { AxiosError } from 'axios';

export class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export const handleApiError = (error: unknown): ApplicationError => {
  if (error instanceof AxiosError) {
    return new ApplicationError(
      error.response?.data?.message || '서버 오류가 발생했습니다.',
      error.response?.data?.code,
      error.response?.status || 500
    );
  }
  return new ApplicationError('알 수 없는 오류가 발생했습니다.');
};

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface APIError {
  status: number;
  message: string;
}

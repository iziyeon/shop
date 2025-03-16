import { useCallback } from "react";

export const useMessage = () => {
  const success = useCallback((message: string) => {
    alert(message); // 임시로 alert 사용
  }, []);

  const error = useCallback((message: string) => {
    alert(message);
  }, []);

  return { success, error };
};

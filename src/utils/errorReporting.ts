interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export const reportError = (error: Error, context?: Record<string, unknown>): void => {
  const errorReport: ErrorReport = {
    message: error.message,
    stack: error.stack,
    context
  };

  // 개발 환경에서는 콘솔에 출력
  if (import.meta.env.DEV) {
    console.error('Error Report:', errorReport);
    return;
  }

  // 프로덕션 환경에서는 에러 추적 서비스로 전송
  // TODO: 에러 추적 서비스 연동 구현
  try {
    // errorTrackingService.send(errorReport);
    console.error('Production Error:', errorReport);
  } catch (e) {
    console.error('Failed to report error:', e);
  }
};

import { memo } from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="loading loading-spinner loading-lg text-primary"></div>
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default memo(LoadingSpinner);

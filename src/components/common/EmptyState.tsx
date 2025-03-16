import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;

import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <Loader2 className={`${sizes[size]} text-primary-500 animate-spin`} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
};

export const SkeletonList = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

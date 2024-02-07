import { Skeleton } from '../ui/skeleton';

const LoadingSettings = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Skeleton className="w-48 h-48 rounded-full" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-64 h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-64 h-10" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSettings;

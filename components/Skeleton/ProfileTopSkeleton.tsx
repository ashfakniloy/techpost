import { Skeleton } from "../ui/skeleton";

function ProfileTopSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
      <Skeleton className="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]" />

      <div className="flex-1 lg:mt-3">
        <div className="space-y-2">
          <Skeleton className="w-3/5 lg:w-2/5 h-6 lg:h-[30px]" />
          <Skeleton className="w-2/6 lg:w-1/6 h-3 lg:h-4 bg-opacity-70 dark:bg-opacity-70" />
        </div>
        <div className="mt-3 lg:mt-5 space-y-2">
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 " />
          <Skeleton className="w-2/3 lg:w-1/3 h-4" />
        </div>
      </div>
    </div>
  );
}

export default ProfileTopSkeleton;

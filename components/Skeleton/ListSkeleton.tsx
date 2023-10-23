import { Skeleton } from "../ui/skeleton";

function ListSkeleton() {
  return (
    <div className="border-b last:border-b-0 border-gray-300 dark:border-gray-700 py-10">
      <div className="flex gap-2.5 lg:gap-4">
        <Skeleton className="lg:w-[230px] lg:h-[150px] w-[110px] h-[80px]" />

        <div className="flex-1">
          <div className="space-y-2.5">
            <div>
              <Skeleton className="h-4 lg:h-6 mt-1" />
              <Skeleton className="h-4 lg:h-6 w-4/5 mt-1" />
            </div>

            <div className="flex items-center gap-5">
              <Skeleton className="h-2.5 lg:h-3.5 w-[50px] lg:w-[66px] bg-opacity-50 dark:bg-opacity-50" />
              <Skeleton className="h-2.5 lg:h-3.5 w-[80px] lg:w-[130px] bg-opacity-50 dark:bg-opacity-50" />
            </div>

            <div>
              <Skeleton className="w-full h-2.5 lg:h-4 bg-opacity-90 dark:bg-opacity-90" />
              <Skeleton className="w-full h-2.5 lg:h-4 mt-1.5 bg-opacity-90 dark:bg-opacity-90" />
            </div>

            <Skeleton className="hidden lg:block w-[170px] h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSkeleton;

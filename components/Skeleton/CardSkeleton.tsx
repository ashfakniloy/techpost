import { Skeleton } from "../ui/skeleton";

function CardSkeleton() {
  return (
    <div className="bg-gray-50 rounded-md shadow-md group dark:bg-custom-gray2 hover:shadow-lg">
      <div>
        <Skeleton className="h-[180px] lg:h-[220px] w-full rounded-b-none" />
      </div>
      <div className="p-4 flex flex-col h-[159px] lg:h-[192px]">
        <div>
          <div className="space-y-1.5">
            <Skeleton className="w-full h-5 lg:h-6" />
            <Skeleton className="w-4/5 h-5 lg:h-6" />
          </div>

          <div className="flex items-center gap-5 mt-2">
            <Skeleton className="h-3 lg:h-3.5 w-[50px] lg:w-[66px] bg-opacity-50 dark:bg-opacity-50" />
            <Skeleton className="h-3 lg:h-3.5 w-[80px] lg:w-[130px] bg-opacity-50 dark:bg-opacity-50" />
          </div>

          <div className="mt-1.5 lg:mt-2 space-y-1.5">
            <Skeleton className="w-full h-3 lg:h-4 bg-opacity-90 dark:bg-opacity-90" />
            <Skeleton className="w-full h-3 lg:h-4 bg-opacity-90 dark:bg-opacity-90" />
          </div>
        </div>
        <Skeleton className="w-2/3 h-3.5 lg:h-[18px] mt-2 lg:mt-3" />
      </div>
    </div>
  );
}

export default CardSkeleton;

import { Skeleton } from "../ui/skeleton";

function ListSkeleton() {
  return (
    <div className="bg-gray-50 h-[96px]  lg:h-[167px]  rounded-md shadow-md dark:bg-custom-gray2 ">
      <div className="flex gap-2.5 lg:gap-4 min-h-[135px] p-2 lg:p-4">
        <Skeleton className="lg:w-[210px] lg:h-[135px] w-[110px] h-[80px]" />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <Skeleton className="h-4 lg:h-6 mt-1" />
            <div className="flex items-center gap-5 mt-1">
              <Skeleton className="h-2.5 lg:h-3.5 w-[50px] lg:w-[66px] bg-opacity-50 dark:bg-opacity-50" />
              <Skeleton className="h-2.5 lg:h-3.5 w-[80px] lg:w-[130px] bg-opacity-50 dark:bg-opacity-50" />
            </div>
            <div className="mt-2 lg:mt-3.5">
              <Skeleton className="w-full h-2.5 lg:h-4 bg-opacity-90 dark:bg-opacity-90" />
              <Skeleton className="w-full h-2.5 lg:h-4 mt-1.5 bg-opacity-90 dark:bg-opacity-90" />
            </div>
          </div>
          <Skeleton className="hidden lg:block w-1/2 h-4 mt-2.5" />
        </div>
      </div>
    </div>
  );
}

export default ListSkeleton;

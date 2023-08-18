import React from "react";
import { Skeleton } from "../ui/skeleton";

function UserCardSkeleton() {
  return (
    <div className="lg:w-[360px] lg:sticky lg:top-[92px]">
      <div className="flex flex-col p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2">
        <Skeleton className="w-[150px] h-[150px] lg:w-full lg:h-[300px]" />
        <div className="mt-3 ">
          <Skeleton className="w-4/5 h-7" />
          <Skeleton className="mt-2 w-1/2  h-3 lg:h-4 bg-opacity-70 dark:bg-opacity-70" />
          <div className="mt-3 flex items-center gap-[15px]">
            <Skeleton className="h-[28px] w-[28px] rounded-full" />
            <Skeleton className="h-[28px] w-[28px] rounded-full" />
            <Skeleton className="h-[28px] w-[28px] rounded-full" />
          </div>
        </div>
        <div className="mt-3 lg:mt-6 space-y-2">
          <Skeleton className="h-3 lg:h-4" />
          <Skeleton className="h-3 lg:h-4" />
          <Skeleton className="h-3 lg:h-4 " />
          <Skeleton className="w-5/6 h-3 lg:h-4" />
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;

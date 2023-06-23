import React from "react";
import { Skeleton } from "../ui/skeleton";

function PostsCardSkeleton({ heading }: { heading: string }) {
  return (
    <div className="w-[360px] h-[515px] bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md">
      <p className="p-3 font-semibold text-center text-gray-900 break-words border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        {heading}
      </p>

      <div className="py-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 h-[90px]">
            <Skeleton className="w-[85px] h-[55px]" />

            <div className="flex flex-col self-start flex-1">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4 mt-1" />

              <Skeleton className="w-1/3 h-3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsCardSkeleton;

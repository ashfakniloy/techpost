import React from "react";
import { Skeleton } from "../ui/skeleton";

function CategoriesSkeleton() {
  const items = [...Array(3)];

  return (
    <div className="w-[360px] bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md">
      <div className="p-3 font-semibold text-center text-gray-900 border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        Categories
      </div>
      <div className="py-2">
        {items.map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-2">
            <Skeleton className="w-2/4 h-5 " />
            <Skeleton className="w-[35px] h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSkeleton;

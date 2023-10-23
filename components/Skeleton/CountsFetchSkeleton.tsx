import { Skeleton } from "../ui/skeleton";

function CountsFetchSkeleton() {
  return (
    <div className="mt-1">
      <Skeleton className="hidden lg:block w-[170px] h-4" />
    </div>
  );
}

export default CountsFetchSkeleton;

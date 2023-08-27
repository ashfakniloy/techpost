import { Skeleton } from "../ui/skeleton";

function CategoryTopSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-[250px] lg:h-[400px] w-full rounded-lg" />
    </div>
  );
}

export default CategoryTopSkeleton;

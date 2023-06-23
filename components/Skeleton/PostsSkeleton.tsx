import { cookies } from "next/headers";
import ListSkeleton from "./ListSkeleton";
import CardSkeleton from "./CardSkeleton";
import { Skeleton } from "../ui/skeleton";
import { PER_PAGE } from "@/config";

function PostsSkeleton() {
  const cookieStore = cookies();
  const view = cookieStore.get("view")?.value;

  const items = [...Array(PER_PAGE)];

  return (
    <>
      {(!view || view === "list") && (
        <div className="space-y-3 lg:space-y-5">
          {items.map((_, i) => (
            <ListSkeleton key={i} />
          ))}
        </div>
      )}

      {view === "grid" && (
        <div className="grid grid-cols-2 gap-3 lg:gap-5">
          {items.map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 mb-10">
        <Skeleton className="w-1/2 lg:w-1/3 h-6 bg-opacity-50 dark:bg-opacity-50" />
      </div>
    </>
  );
}

export default PostsSkeleton;

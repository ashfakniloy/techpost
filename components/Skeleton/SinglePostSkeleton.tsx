import { Skeleton } from "../ui/skeleton";

function SinglePostSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="mt-1.5 mb-5 w-[100px] h-[16px] lg:h-[18px]" />

      <div>
        <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
          <div className="space-y-3">
            <Skeleton className="rounded-lg h-7 lg:h-9" />
            <Skeleton className="rounded-lg h-7 lg:h-9 w-full lg:w-5/6" />
            <Skeleton className="lg:hidden w-1/2 rounded-lg h-7 lg:h-9" />
          </div>

          <div className="mt-2 lg:mt-[18px] ml-2 lg:ml-0">
            <div className="flex items-center gap-2">
              <Skeleton className="h-[35px] w-[35px] rounded-full" />
              <Skeleton className="h-4 lg:h-[18px] w-[150px] bg-opacity-50 dark:bg-opacity-50" />
            </div>

            <div className="mt-[10px] lg:mt-3 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3.5 lg:gap-0">
              <Skeleton className=" h-4 lg:h-[18px] bg-opacity-50 dark:bg-opacity-50 w-[240px]" />
              <div className="flex items-center gap-[15px]">
                <Skeleton className="h-[28px] w-[28px] rounded-full" />
                <Skeleton className="h-[28px] w-[28px] rounded-full" />
                <Skeleton className="h-[28px] w-[28px] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="mt-[18px] h-[280px] lg:h-[470px] rounded-none" />

        <div className="mt-6 space-y-3">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          {/* <Skeleton className="h-5" /> */}
          <Skeleton className="h-5 bg-opacity-80 dark:bg-opacity-80" />
          <Skeleton className="h-5 bg-opacity-60 dark:bg-opacity-70" />
          <Skeleton className="h-5 bg-opacity-40 dark:bg-opacity-60" />
          {/* <Skeleton className="h-5 bg-opacity-50 dark:bg-opacity-50" />
          <Skeleton className="h-5 bg-opacity-40 dark:bg-opacity-40" />
          <Skeleton className="h-5 bg-opacity-30 dark:bg-opacity-30" />
          <Skeleton className="h-5 bg-opacity-20 dark:bg-opacity-20" /> */}
        </div>

        {/* <div className="mt-5">
          <Comment postId={postId} authorId={post.userId} />
        </div> */}
      </div>
    </div>
  );
}

export default SinglePostSkeleton;

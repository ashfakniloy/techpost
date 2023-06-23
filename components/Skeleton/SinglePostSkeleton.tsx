import { Skeleton } from "../ui/skeleton";

function SinglePostSkeleton() {
  return (
    <>
      <Skeleton className="mb-5 w-[100px] h-[16px] lg:h-[18px]" />

      <div className="">
        <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
          <div className="space-y-3">
            <Skeleton className="rounded-lg h-7 lg:h-9" />
            <Skeleton className="w-full lg:w-1/4 rounded-lg h-7 lg:h-9" />
            {/* <Skeleton className="lg:hidden w-2/5 rounded-lg h-7 lg:h-9" /> */}
          </div>

          <div className="flex items-center gap-3 lg:gap-6 mt-2 lg:mt-5">
            <div className="flex items-center gap-3 lg:gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-[35px] w-[35px] rounded-full" />
                <Skeleton className="h-3.5 lg:h-4 w-[70px] lg:w-[100px] bg-opacity-50 dark:bg-opacity-50" />
              </div>
              <Skeleton className="h-3.5 lg:h-4 bg-opacity-50 dark:bg-opacity-50 w-[100px] lg:w-[185px]" />
            </div>
          </div>
        </div>

        <Skeleton className="mt-3 lg:mt-5 h-[280px] lg:h-[470px] relative" />

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
    </>
  );
}

export default SinglePostSkeleton;

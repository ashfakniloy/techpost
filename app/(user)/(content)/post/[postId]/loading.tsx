import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import SinglePostSkeleton from "@/components/Skeleton/SinglePostSkeleton";
import React from "react";

function LoadingPost() {
  return (
    <div className="flex items-start justify-between gap-5">
      <div className="flex-1">
        <SinglePostSkeleton />
      </div>
      <div className="hidden lg:flex flex-col gap-5">
        <PostsCardSkeleton heading="Related Posts" />
        <PostsCardSkeleton heading={`More Posts`} />
        <CategoriesSkeleton />
      </div>
    </div>
  );
}

export default LoadingPost;

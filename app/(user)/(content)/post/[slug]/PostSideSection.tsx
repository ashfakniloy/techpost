import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import React, { Suspense } from "react";
import RelatedPosts from "./RelatedPosts";
import { getSinglePost } from "@/db/queries/getSinglePost";
import { notFound } from "next/navigation";
import UsersMorePosts from "./UsersMorePosts";

async function PostSideSection({ slug }: { slug: string }) {
  const { data: post } = await getSinglePost({ slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="hidden lg:flex flex-col gap-5">
      <Suspense fallback={<PostsCardSkeleton heading="Related Posts" />}>
        <RelatedPosts
          categoryName={post.categoryName}
          currentPostId={post.id}
        />
      </Suspense>

      <div className="sticky top-[90px]">
        <Suspense
          fallback={
            <PostsCardSkeleton
              heading={`More Posts from ${post.user.username}`}
            />
          }
        >
          <UsersMorePosts
            username={post.user.username}
            currentPostId={post.id}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default PostSideSection;

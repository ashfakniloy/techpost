import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import { Suspense } from "react";
import RelatedPosts from "./RelatedPosts";
import { getSinglePost } from "@/db/queries/getSinglePost";
import { notFound } from "next/navigation";
import UsersMorePosts from "./UsersMorePosts";
import SinglePostSkeleton from "@/components/Skeleton/SinglePostSkeleton";

async function PostLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { data: post } = await getSinglePost({ slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex justify-between gap-5">
      <Suspense fallback={<SinglePostSkeleton />}>{children}</Suspense>
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
    </div>
  );
}

export default PostLayout;

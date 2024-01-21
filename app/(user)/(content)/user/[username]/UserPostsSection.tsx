import { Suspense } from "react";
import UserSideSection from "./UserSideSection";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import PostsHeader from "@/components/Post/PostsHeader";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import PostsView from "@/components/Post/PostsView";
import { getPostsByUsername } from "@/db/queries/getPostsByUsername";

async function UserPosts({
  username,
  limitNumber,
  pageNumber,
  sort,
}: {
  username: string;
  limitNumber: number;
  pageNumber: number;
  sort: string;
}) {
  const { data, count } = await getPostsByUsername({
    username,
    limitNumber,
    pageNumber,
    sort,
  });

  if (!data) {
    return (
      <p className="mt-20 text-xl text-center text-red-500">No posts found</p>
    );
  }

  return <PostsView posts={data} postCount={count} limit={limitNumber} />;
}

function UserPostsSection({
  searchParams,
  usernameDecoded,
}: {
  searchParams: { page: string; limit: string; sort: string };
  usernameDecoded: string;
}) {
  const { page, limit, sort } = searchParams;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const cardTitle = () => {
    if (!sort || sort === "recent") return `Popular from ${usernameDecoded}`;
    if (sort === "popular") return `Recent from ${usernameDecoded}`;
    return `Popular from ${usernameDecoded}`;
  };

  const getPostsTitle = () => {
    if (!sort || sort === "recent")
      return `Recent Posts from ${usernameDecoded}`;
    if (sort === "popular") return `Popular Posts from ${usernameDecoded}`;
    return "invalid";
  };

  const postsTitle = getPostsTitle();
  return (
    <div className="lg:flex items-start justify-between gap-5 mt-10 lg:mt-20">
      <section className="lg:flex-1 lg:max-w-[796px]">
        <PostsHeader postsTitle={postsTitle} />

        {postsTitle === "invalid" ? (
          <p className="mt-20 text-xl text-center text-red-500">
            Invalid sort parameter
          </p>
        ) : (
          <Suspense key={page || sort} fallback={<PostsSkeleton />}>
            <UserPosts
              username={usernameDecoded}
              limitNumber={limitNumber}
              pageNumber={pageNumber}
              sort={sort}
            />
          </Suspense>
        )}
      </section>

      <div className="hidden lg:flex flex-col gap-5 lg:sticky top-[90px]">
        <Suspense
          key={sort}
          fallback={<PostsCardSkeleton heading={cardTitle()} />}
        >
          <UserSideSection
            cardTitle={cardTitle()}
            username={usernameDecoded}
            sort={sort}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default UserPostsSection;

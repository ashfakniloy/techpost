import { Suspense } from "react";
import PostsView from "@/components/Post/PostsView";
import PostsHeader from "@/components/Post/PostsHeader";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import { getAuthSession } from "@/lib/next-auth";
import { getPostsByUserId } from "@/db/queries/getrPostsByUserId";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

export const metadata = {
  title: "My posts",
};

async function MyPosts({
  userId,
  limitNumber,
  pageNumber,
  sort,
}: {
  userId: string;
  limitNumber: number;
  pageNumber: number;
  sort: string;
}) {
  const { data, count } = await getPostsByUserId({
    userId,
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

async function ProfilePostsPage({
  searchParams: { page, limit, sort },
}: SearchParams) {
  const session = await getAuthSession();

  if (!session) return;

  const userId = session?.user.id;
  const username = session.user.username;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const getPostsTitle = () => {
    if (!sort || sort === "recent") return `Recent Posts from ${username}`;
    if (sort === "popular") return `Popular Posts from ${username}`;
    return "invalid";
  };

  const postsTitle = getPostsTitle();

  return (
    <section>
      <PostsHeader postsTitle={postsTitle} />

      {postsTitle === "invalid" ? (
        <p className="mt-20 text-xl text-center text-red-500">
          Invalid sort parameter
        </p>
      ) : (
        <Suspense key={page || sort} fallback={<PostsSkeleton />}>
          <MyPosts
            userId={userId}
            pageNumber={pageNumber}
            limitNumber={limitNumber}
            sort={sort}
          />
        </Suspense>
      )}
    </section>
  );
}

export default ProfilePostsPage;

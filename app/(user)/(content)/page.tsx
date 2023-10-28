import { Suspense } from "react";
import HomeSideSection from "./HomeSideSection";
import PostsHeader from "@/components/Post/PostsHeader";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import { getAllPosts } from "@/db/queries/getAllPosts";
import PostsView from "@/components/Post/PostsView";
import Categories from "@/components/Post/Categories";
import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
import EditorsChoice from "./EditorsChoice";
import EditorsChoiceSkeleton from "@/components/Skeleton/EditorsChoiceSkeleton";

// export const revalidate = 0;
// export const fetchCache = "force-no-store";

// export const dynamic = "force-dynamic";

async function Posts({
  limitNumber,
  pageNumber,
  sort,
}: {
  limitNumber: number;
  pageNumber: number;
  sort: string;
}) {
  const { data, count } = await getAllPosts({ limitNumber, pageNumber, sort });

  if (!data) {
    return (
      <p className="mt-20 text-xl text-center text-red-500">No posts found</p>
    );
  }

  return <PostsView posts={data} postCount={count} limit={limitNumber} />;
}

function HomePage({ searchParams: { page, limit, sort } }: SearchParams) {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const getCardTitle = () => {
    if (!sort || sort === "recent") return `Popular posts`;
    if (sort === "popular") return `Recent posts`;
    return "Popular posts";
  };

  const cardTitle = getCardTitle();

  const getPostsTitle = () => {
    if (!sort || sort === "recent") return `Recent Posts`;
    if (sort === "popular") return `Popular Posts`;
    return "invalid";
  };

  const postsTitle = getPostsTitle();

  return (
    <div className="lg:flex justify-between gap-5">
      <div className="lg:flex-1 lg:max-w-[796px]">
        {(!pageNumber || pageNumber === 1) && (
          <Suspense fallback={<EditorsChoiceSkeleton />}>
            <EditorsChoice />
          </Suspense>
        )}

        <section>
          <PostsHeader postsTitle={postsTitle} />

          {postsTitle === "invalid" ? (
            <p className="mt-20 text-xl text-center text-red-500">
              Invalid sort parameter
            </p>
          ) : (
            <Suspense key={page || sort} fallback={<PostsSkeleton />}>
              <Posts
                limitNumber={limitNumber}
                pageNumber={pageNumber}
                sort={sort}
              />
            </Suspense>
          )}
        </section>
      </div>

      <div className="hidden lg:flex flex-col gap-5">
        <Suspense
          key={sort}
          fallback={<PostsCardSkeleton heading={cardTitle} />}
        >
          <HomeSideSection sort={sort} cardTitle={cardTitle} />
        </Suspense>

        <div className="sticky top-[90px]">
          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import PostsHeader from "@/components/Post/PostsHeader";
import PostsView from "@/components/Post/PostsView";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import { getPostsByCategory } from "@/db/queries/getPostsByCategory";
import { Suspense } from "react";
import CategorySideSection from "./CategorySideSection";
import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
import Categories from "@/components/Post/Categories";

async function CategoryPosts({
  categoryName,
  limitNumber,
  pageNumber,
  sort,
}: {
  categoryName: string;
  limitNumber: number;
  pageNumber: number;
  sort: string;
}) {
  const { data, count } = await getPostsByCategory({
    categoryName,
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

function CategoryPostsSection({
  // page,
  // limit,
  // sort,
  searchParams,
  categoryNameDecoded,
}: {
  // page: string;
  // limit: string;
  // sort: string;
  searchParams: { page: string; limit: string; sort: string };
  categoryNameDecoded: string;
}) {
  const { page, limit, sort } = searchParams;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const getCardTitle = () => {
    if (!sort || sort === "recent")
      return `Popular from ${categoryNameDecoded}`;
    if (sort === "popular") return `Recent from ${categoryNameDecoded}`;
    return `Popular from ${categoryNameDecoded}`;
  };

  const cardTitle = getCardTitle();

  const getPostsTitle = () => {
    if (!sort || sort === "recent")
      return `Recent Posts from ${categoryNameDecoded}`;
    if (sort === "popular") return `Popular Posts from ${categoryNameDecoded}`;
    return "invalid";
  };

  const postsTitle = getPostsTitle();

  return (
    <div className="lg:flex justify-between gap-5 mt-10 lg:mt-20">
      <section className="lg:flex-1 lg:max-w-[796px] overflow-hidden">
        <PostsHeader postsTitle={postsTitle} />

        {postsTitle === "invalid" ? (
          <p className="mt-20 text-xl text-center text-red-500">
            Invalid sort parameter
          </p>
        ) : (
          <Suspense key={page || sort} fallback={<PostsSkeleton />}>
            <CategoryPosts
              categoryName={categoryNameDecoded}
              limitNumber={limitNumber}
              pageNumber={pageNumber}
              sort={sort}
            />
          </Suspense>
        )}
      </section>

      <div className="hidden lg:flex flex-col gap-5 lg:sticky top-[97px]">
        <Suspense
          key={sort}
          fallback={<PostsCardSkeleton heading={cardTitle} />}
        >
          <CategorySideSection
            categoryName={categoryNameDecoded}
            sort={sort}
            cardTitle={cardTitle}
          />
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

export default CategoryPostsSection;

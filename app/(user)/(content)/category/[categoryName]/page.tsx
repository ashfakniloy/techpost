import PostsView from "@/components/Post/PostsView";
import CategoryTopSection from "./CategoryTopSection";
import CategorySideSection from "./CategorySideSection";
import { getPostsByCategory } from "@/prisma/find/getPostsByCategory";
import { notFound } from "next/navigation";
import { getCategories } from "@/prisma/find/getCategories";
import PostsHeader from "@/components/Post/PostsHeader";
import { Suspense } from "react";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import Categories from "@/components/Post/Categories";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
import { getCategoryByName } from "@/prisma/find/getCategoryByName";
import { Metadata } from "next";
import { capitalizeWords } from "@/utils/capitalizeWords";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type CategoryPageProps = SearchParams & {
  params: {
    categoryName: string;
  };
};

export async function generateMetadata({
  params: { categoryName },
}: CategoryPageProps): Promise<Metadata> {
  const categoryNameDecoded = decodeURIComponent(categoryName);

  const { data: category } = await getCategoryByName({
    categoryName: categoryNameDecoded,
  });

  if (!category) {
    return {
      title: "Category not found",
    };
  }

  return {
    title: capitalizeWords(category.name),
    openGraph: {
      images: {
        url: category.imageUrl,
        width: 1200,
        height: 630,
        alt: category.name,
      },
    },
  };
}

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
  // await new Promise((resolve) => setTimeout(resolve, 5000));

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

async function CategoryPage({
  params: { categoryName },
  searchParams: { page, limit, sort },
}: CategoryPageProps) {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // const { data: categories } = await getCategories();

  // const allCategories = categories.map((category) => category.name);

  // if (!allCategories.includes(categoryName)) {
  //   notFound();
  // }

  const categoryNameDecoded = decodeURIComponent(categoryName);

  const { data: category } = await getCategoryByName({
    categoryName: categoryNameDecoded,
  });

  if (!category) {
    notFound();
  }

  // const categoryNameDecoded = categoryName.split("_").join(" ");

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
    <div>
      <CategoryTopSection categoryName={categoryNameDecoded} />

      <div className="lg:flex items-start justify-between gap-5 mt-10 lg:mt-20">
        <div className="lg:flex-1 lg:max-w-[796px] overflow-hidden">
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
        </div>

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

          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;

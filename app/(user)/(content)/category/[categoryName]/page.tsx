import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryTopSection from "./CategoryTopSection";
// import { getCategoryByName } from "@/db/queries/getCategoryByName";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getAllCategoriesPath } from "@/db/queries/getAllCategoriesPath";
import CategoryPostsSection from "./CategoryPostsSection";
import { fetchSingleCategory } from "@/db/fetch/fetchSingleCategory";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type CategoryPageProps = SearchParams & {
  params: {
    categoryName: string;
  };
};

export async function generateStaticParams() {
  const { categoriesPath } = await getAllCategoriesPath();

  return categoriesPath;
}

export async function generateMetadata({
  params: { categoryName },
}: CategoryPageProps): Promise<Metadata> {
  const categoryNameDecoded = decodeURIComponent(categoryName);

  // const { data: category } = await getCategoryByName({
  //   categoryName: categoryNameDecoded,
  // });

  const category = await fetchSingleCategory({
    categoryName: categoryNameDecoded,
  });

  if (!category) {
    return {
      title: "Category not found",
    };
  }

  const categoryNameCapitalize = capitalizeWords(category.name);

  return {
    title: categoryNameCapitalize,
    openGraph: {
      images: {
        url: category.imageUrl,
        width: 1200,
        height: 630,
        alt: category.name,
      },
    },
    description: `Read latest articles on ${categoryNameCapitalize} at TechPost`,
  };
}

async function CategoryPage({
  params: { categoryName },
  searchParams,
}: // searchParams: { page, limit, sort },
CategoryPageProps) {
  const categoryNameDecoded = decodeURIComponent(categoryName);

  // const { data: category } = await getCategoryByName({
  //   categoryName: categoryNameDecoded,
  // });

  const category = await fetchSingleCategory({
    categoryName: categoryNameDecoded,
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <CategoryTopSection
        categoryName={category.name}
        quotes={category.quotes}
        imageUrl={category.imageUrl}
      />

      <Suspense fallback={null}>
        <CategoryPostsSection
          // limit={limit}
          // page={page}
          // sort={sort}
          searchParams={searchParams}
          categoryNameDecoded={categoryNameDecoded}
        />
      </Suspense>
    </div>
  );
}

export default CategoryPage;

// import { Suspense } from "react";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import PostsView from "@/components/Post/PostsView";
// import CategoryTopSection from "./CategoryTopSection";
// import CategorySideSection from "./CategorySideSection";
// import { getPostsByCategory } from "@/db/queries/getPostsByCategory";
// import PostsHeader from "@/components/Post/PostsHeader";
// import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
// import Categories from "@/components/Post/Categories";
// import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
// import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
// import { getCategoryByName } from "@/db/queries/getCategoryByName";
// import { capitalizeWords } from "@/utils/capitalizeWords";
// import CategoryTopSkeleton from "@/components/Skeleton/CategoryTopSkeleton";
// import { getAllCategoriesPath } from "@/db/queries/getAllCategoriesPath";
// import CategoryPostsSection from "./CategoryPostsSection";
// // import { getCategories } from "@/db/queries/getCategories";

// // export const revalidate = 0;
// // export const dynamic = "force-dynamic";
// // export const fetchCache = "force-no-store";

// type CategoryPageProps = SearchParams & {
//   params: {
//     categoryName: string;
//   };
// };

// export async function generateStaticParams() {
//   const { categoriesPath } = await getAllCategoriesPath();

//   return categoriesPath;
// }

// export async function generateMetadata({
//   params: { categoryName },
// }: CategoryPageProps): Promise<Metadata> {
//   const categoryNameDecoded = decodeURIComponent(categoryName);

//   const { data: category } = await getCategoryByName({
//     categoryName: categoryNameDecoded,
//   });

//   if (!category) {
//     return {
//       title: "Category not found",
//     };
//   }

//   const categoryNameCapitalize = capitalizeWords(category.name);

//   return {
//     title: categoryNameCapitalize,
//     openGraph: {
//       images: {
//         url: category.imageUrl,
//         width: 1200,
//         height: 630,
//         alt: category.name,
//       },
//     },
//     description: `Read latest articles on ${categoryNameCapitalize} at TechPost`,
//   };
// }

// // async function CategoryPosts({
// //   categoryName,
// //   limitNumber,
// //   pageNumber,
// //   sort,
// // }: {
// //   categoryName: string;
// //   limitNumber: number;
// //   pageNumber: number;
// //   sort: string;
// // }) {
// //   const { data, count } = await getPostsByCategory({
// //     categoryName,
// //     limitNumber,
// //     pageNumber,
// //     sort,
// //   });

// //   if (!data) {
// //     return (
// //       <p className="mt-20 text-xl text-center text-red-500">No posts found</p>
// //     );
// //   }

// //   return <PostsView posts={data} postCount={count} limit={limitNumber} />;
// // }

// async function CategoryPage({
//   params: { categoryName },
//   searchParams,
// }: // searchParams: { page, limit, sort },
// CategoryPageProps) {
//   // const pageNumber = Number(page);
//   // const limitNumber = Number(limit);

//   // const { data: categories } = await getCategories();

//   // const allCategories = categories.map((category) => category.name);

//   // if (!allCategories.includes(categoryName)) {
//   //   notFound();
//   // }

//   const categoryNameDecoded = decodeURIComponent(categoryName);

//   const { data: category } = await getCategoryByName({
//     categoryName: categoryNameDecoded,
//   });

//   if (!category) {
//     notFound();
//   }

//   // const categoryNameDecoded = categoryName.split("_").join(" ");

//   // const getCardTitle = () => {
//   //   if (!sort || sort === "recent")
//   //     return `Popular from ${categoryNameDecoded}`;
//   //   if (sort === "popular") return `Recent from ${categoryNameDecoded}`;
//   //   return `Popular from ${categoryNameDecoded}`;
//   // };

//   // const cardTitle = getCardTitle();

//   // const getPostsTitle = () => {
//   //   if (!sort || sort === "recent")
//   //     return `Recent Posts from ${categoryNameDecoded}`;
//   //   if (sort === "popular") return `Popular Posts from ${categoryNameDecoded}`;
//   //   return "invalid";
//   // };

//   // const postsTitle = getPostsTitle();

//   return (
//     <div>
//       <Suspense fallback={<CategoryTopSkeleton />}>
//         <CategoryTopSection categoryName={categoryNameDecoded} />
//       </Suspense>

//       <Suspense fallback={null}>
//         <CategoryPostsSection
//           // limit={limit}
//           // page={page}
//           // sort={sort}
//           searchParams={searchParams}
//           categoryNameDecoded={categoryNameDecoded}
//         />
//       </Suspense>

//       {/* <div className="lg:flex justify-between gap-5 mt-10 lg:mt-20">

//         <section className="lg:flex-1 lg:max-w-[796px] overflow-hidden">
//           <PostsHeader postsTitle={postsTitle} />

//           {postsTitle === "invalid" ? (
//             <p className="mt-20 text-xl text-center text-red-500">
//               Invalid sort parameter
//             </p>
//           ) : (
//             <Suspense key={page || sort} fallback={<PostsSkeleton />}>
//               <CategoryPosts
//                 categoryName={categoryNameDecoded}
//                 limitNumber={limitNumber}
//                 pageNumber={pageNumber}
//                 sort={sort}
//               />
//             </Suspense>
//           )}
//         </section>

//         <div className="hidden lg:flex flex-col gap-5 lg:sticky top-[97px]">
//           <Suspense
//             key={sort}
//             fallback={<PostsCardSkeleton heading={cardTitle} />}
//           >
//             <CategorySideSection
//               categoryName={categoryNameDecoded}
//               sort={sort}
//               cardTitle={cardTitle}
//             />
//           </Suspense>

//           <div className="sticky top-[90px]">
//             <Suspense fallback={<CategoriesSkeleton />}>
//               <Categories />
//             </Suspense>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default CategoryPage;

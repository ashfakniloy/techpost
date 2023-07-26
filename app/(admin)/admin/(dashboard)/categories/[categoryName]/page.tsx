import Paths from "@/components/Admin/Layout/Paths";
import { getCategories } from "@/prisma/find/getCategories";
import { getCategoryByName } from "@/prisma/find/getCategoryByName";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryInfo from "./CategoryInfo";
import CategoryQuotes from "./CategoryQuotes";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import { postsColumns } from "@/components/Admin/DataTable/components/columns/postsColumns";
import { getPostsByCategory } from "@/prisma/find/getPostsByCategory";
import { getAllPostsAdmin } from "@/prisma/find/admin/getAllPostsAdmin";
import { categoriesPostsColumn } from "@/components/Admin/DataTable/components/columns/categoriesPostsColumn";
import CategoryOption from "./CategoryOption";
import Section from "@/components/Admin/Section";

// export const dynamic = "force-dynamic";

type CategoryPageProps = SearchParams & {
  params: {
    categoryName: string;
  };
};

async function CategoryPageAdmin({
  params: { categoryName },
  searchParams: { page, limit, sort, search },
}: CategoryPageProps) {
  // const { data: categories } = await getCategories();
  const { data: category } = await getCategoryByName({ categoryName });

  // const allCategories = categories.map((category) => category.name);

  // if (!allCategories.includes(categoryName)) {
  //   notFound();
  // }

  if (!category) {
    notFound();
  }

  const limitNumber = Number(limit);
  const pageNumber = Number(page);
  // const { data, count } = await getAllPosts({
  //   limitNumber: limitNumber || 10,
  //   pageNumber,
  // });

  const sortValues = sort?.split("%20").join("").split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { data: categoryPosts, count } = await getAllPostsAdmin({
    limitNumber: limitNumber || 10,
    pageNumber,
    sortBy: sortBy,
    order: orderBy,
    title: search,
    categoryName: categoryName,
  });

  console.log("data", category);

  const SectionTitle = (
    <span>
      All posts from{" "}
      <span className="capitalize">{categoryName.split("_").join(" ")}</span>
    </span>
  );

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0">
        <CategoryOption
          id={category.id}
          name={category.name}
          imageUrl={category.imageUrl}
          imageId={category.imageId}
          quotes={category.quotes}
        />
      </div>
      <div className="space-y-7">
        <div className="flex gap-7">
          <CategoryInfo
            category_name={category.name}
            total_quotes={category._count.quotes}
            total_posts={category._count.posts}
            created_at={category.createdAt}
            updated_at={category.updatedAt}
            imageUrl={category.imageUrl}
          />

          <CategoryQuotes quotes={category.quotes} />
        </div>

        <Section title={SectionTitle}>
          <DataTable
            columns={categoriesPostsColumn}
            data={categoryPosts}
            count={count}
            searchBy="title"
            deleteUrl={`/api/admin/post`}
            mannualControl
          />
        </Section>
      </div>
    </div>
  );
}

export default CategoryPageAdmin;

import { getCategoryByName } from "@/db/queries/getCategoryByName";
import { notFound } from "next/navigation";
import CategoryInfo from "./CategoryInfo";
import CategoryQuotes from "./CategoryQuotes";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import { getAllPostsAdmin } from "@/db/queries/admin/getAllPostsAdmin";
import { categoriesPostsColumn } from "@/components/Admin/DataTable/components/columns/categoriesPostsColumn";
import CategoryOption from "./CategoryOption";
import Section from "@/components/Admin/Section";
import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
import { deletePostAdmin } from "@/db/mutations/admin/deletePostAdmin";

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
  const categoryNameDecoded = decodeURIComponent(categoryName);

  const { data: category } = await getCategoryByName({
    categoryName: categoryNameDecoded,
  });

  if (!category) {
    notFound();
  }

  const limitNumber = Number(limit);
  const pageNumber = Number(page);

  const sortValues = sort?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  console.log("sortvalues", sortValues);

  const { data: categoryPosts, count } = await getAllPostsAdmin({
    limitNumber: limitNumber || 10,
    pageNumber,
    sortBy: sortBy,
    order: orderBy,
    title: search,
    categoryName: categoryNameDecoded,
  });

  const blurDataUrl = await getImagePlaceholder(category.imageUrl);

  // console.log("data", category);

  const SectionTitle = (
    <span>
      All posts from <span className="capitalize">{categoryNameDecoded}</span>
    </span>
  );

  return (
    <div className="relative">
      <div className="absolute -top-7 lg:-top-14 right-0">
        <CategoryOption
          id={category.id}
          name={category.name}
          imageUrl={category.imageUrl}
          imageId={category.imageId}
          quotes={category.quotes}
        />
      </div>
      <div className="pt-8 lg:pt-0 space-y-7">
        <div className="flex flex-col lg:flex-row gap-7">
          <CategoryInfo
            category_name={category.name}
            total_quotes={category._count.quotes}
            total_posts={category._count.posts}
            created_at={category.createdAt}
            updated_at={category.updatedAt}
            imageUrl={category.imageUrl}
            blurDataUrl={blurDataUrl}
          />

          <CategoryQuotes quotes={category.quotes} />
        </div>

        <Section title={SectionTitle}>
          {categoryPosts && (
            <DataTable
              columns={categoriesPostsColumn}
              data={categoryPosts}
              count={count}
              searchBy="title"
              deleteAction={deletePostAdmin}
              mannualControl
            />
          )}
        </Section>
      </div>
    </div>
  );
}

export default CategoryPageAdmin;

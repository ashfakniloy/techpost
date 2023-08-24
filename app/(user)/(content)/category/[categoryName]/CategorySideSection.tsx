import PostsSideSection from "@/components/Post/PostsSideSection";
import { getPostsByCategory } from "@/db/queries/getPostsByCategory";

async function CategorySideSection({
  cardTitle,
  categoryName,
  sort,
}: {
  cardTitle: string;
  categoryName: string;
  sort: string;
}) {
  const sortReversed = sort === "popular" ? "recent" : "popular";

  const { data } = await getPostsByCategory({
    categoryName,
    sort: sortReversed,
    limitNumber: 5,
  });

  return data && <PostsSideSection heading={cardTitle} posts={data} />;
}

export default CategorySideSection;

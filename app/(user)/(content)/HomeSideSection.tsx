import { getAllPosts } from "@/db/queries/getAllPosts";
import PostsSideSection from "@/components/Post/PostsSideSection";

async function HomeSideSection({
  sort,
  cardTitle,
}: {
  sort: string;
  cardTitle: string;
}) {
  const sortReversed = sort === "popular" ? "recent" : "popular";

  const { data } = await getAllPosts({
    limitNumber: 5,
    sort: sortReversed,
  });

  return data && <PostsSideSection heading={cardTitle} posts={data} />;
}

export default HomeSideSection;

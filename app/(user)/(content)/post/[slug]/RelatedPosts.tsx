import PostsSideSection from "@/components/Post/PostsSideSection";
import { getRelatedPosts } from "@/db/queries/getRelatedPosts";

async function RelatedPosts({
  categoryName,
  currentPostId,
}: {
  categoryName: string;
  currentPostId: string;
}) {
  const { data: relatedPosts } = await getRelatedPosts({
    categoryName,
    limit: 5 + 1, //have to get 1 extra post because current post will be filtered out
  });

  const filteredRelatedPosts = relatedPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 5); // have to select first 5 items if no post is filtered out

  return (
    <PostsSideSection heading="Related Posts" posts={filteredRelatedPosts} />
  );
}

export default RelatedPosts;

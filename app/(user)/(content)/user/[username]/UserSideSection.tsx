import PostsSideSection from "@/components/Post/PostsSideSection";
import { getPostsByUsername } from "@/db/queries/getPostsByUsername";

async function UserSideSection({
  cardTitle,
  username,
  sort,
}: {
  cardTitle: string;
  username: string;
  sort: string;
}) {
  const sortReversed = sort === "popular" ? "recent" : "popular";

  const { data } = await getPostsByUsername({
    username,
    sort: sortReversed,
    limitNumber: 5,
  });

  return data && <PostsSideSection heading={cardTitle} posts={data} />;
}

export default UserSideSection;

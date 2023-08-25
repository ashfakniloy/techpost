import PostsSideSection from "@/components/Post/PostsSideSection";
import { getMorePostsByUsername } from "@/db/queries/getMorePostsByUsername";

async function UsersMorePosts({
  username,
  currentPostId,
}: {
  username: string;
  currentPostId: string;
}) {
  const { data: usersMorePosts } = await getMorePostsByUsername({
    username,
    limit: 5 + 1, //have to get 1 extra post because current post might appear in here and it has to filtered out
  });

  const filteredUsersMorePosts = usersMorePosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 5); // have to select first 5 items if no post is filtered out

  return (
    <PostsSideSection
      heading={`More Posts from ${username}`}
      posts={filteredUsersMorePosts}
    />
  );
}

export default UsersMorePosts;

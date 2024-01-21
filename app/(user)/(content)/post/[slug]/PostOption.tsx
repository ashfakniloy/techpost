import OptionButton from "@/components/Post/OptionButton";
import { getAuthSession } from "@/lib/next-auth";

async function PostOption({
  postId,
  userId,
  title,
  slug,
}: {
  postId: string;
  userId: string;
  title: string;
  slug: string;
}) {
  const session = await getAuthSession();

  return (
    <>
      {session?.user.id === userId && (
        <OptionButton
          title={title}
          postId={postId}
          slug={slug}
          redirectAfterDelete={"/"}
        />
      )}
    </>
  );
}

export default PostOption;
